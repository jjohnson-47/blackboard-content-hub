# DevPreview UI Implementation Guide

## Getting Started

1. **Set up project structure**
   ```bash
   mkdir -p src/{core,components,components/ui,services,utils,features}
   ```

2. **Initialize package.json**
   ```bash
   npm init -y
   npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
   npm install codemirror js-beautify
   ```

3. **Create tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "esnext",
       "moduleResolution": "node",
       "strict": true,
       "outDir": "./dist",
       "sourceMap": true
     },
     "include": ["src/**/*"]
   }
   ```

## Implementation Steps

### Step 1: Extract Core Services

1. **Create AppState.ts**
   ```typescript
   // src/core/AppState.ts
   type StateChangeListener = (state: Partial<AppState>) => void;

   export interface Component {
     id: string;
     name: string;
     locationType: 'local' | 'development' | 'shared' | 'course';
     path?: string;
   }

   export interface ComponentData {
     html: string;
     css: string;
     js: string;
   }

   export class AppState {
     currentComponent: Component | null = null;
     componentData: ComponentData = { html: '', css: '', js: '' };
     isEditorDirty: boolean = false;
     currentTab: 'html' | 'css' | 'js' = 'html';
     
     private listeners: StateChangeListener[] = [];

     subscribe(listener: StateChangeListener): () => void {
       this.listeners.push(listener);
       return () => this.listeners = this.listeners.filter(l => l !== listener);
     }

     setState(newState: Partial<AppState>): void {
       Object.assign(this, newState);
       this.listeners.forEach(listener => listener(newState));
     }
   }

   export default new AppState(); // Singleton
   ```

2. **Create StorageService.ts**
   ```typescript
   // src/services/StorageService.ts
   import { Component, ComponentData } from '../core/AppState';

   export class StorageService {
     saveComponent(component: Component, data: ComponentData): boolean {
       try {
         const componentData = {
           id: component.id,
           name: component.name,
           html: data.html,
           css: data.css,
           js: data.js,
           lastModified: new Date().toISOString()
         };
         
         localStorage.setItem(`component_${component.id}`, JSON.stringify(componentData));
         localStorage.setItem('lastEditedComponent', JSON.stringify(componentData));
         this.updateProjectsList(componentData);
         return true;
       } catch (error) {
         console.error('Error saving to localStorage:', error);
         return false;
       }
     }

     loadComponent(id: string): ComponentData {
       try {
         const data = localStorage.getItem(`component_${id}`);
         if (!data) throw new Error('Component not found');
         
         const parsed = JSON.parse(data);
         return {
           html: parsed.html || '',
           css: parsed.css || '',
           js: parsed.js || ''
         };
       } catch (error) {
         throw new Error(`Failed to load component: ${error.message}`);
       }
     }

     getLastEditedComponent(): Component | null {
       try {
         const data = localStorage.getItem('lastEditedComponent');
         if (!data) return null;
         
         const parsed = JSON.parse(data);
         return {
           id: parsed.id,
           name: parsed.name,
           locationType: 'local'
         };
       } catch {
         return null;
       }
     }

     private updateProjectsList(componentData: any): void {
       // Implementation omitted for brevity
     }
   }
   ```

3. **Create APIService.ts**
   ```typescript
   // src/services/APIService.ts
   import { Component, ComponentData } from '../core/AppState';

   export class APIService {
     async saveComponent(component: Component, data: ComponentData): Promise<boolean> {
       try {
         // Create combined HTML
         const combinedHTML = this.combineComponentData(component, data);
         
         const response = await fetch('/api/save-component', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             id: component.id,
             name: component.name,
             locationType: component.locationType,
             path: component.path,
             content: combinedHTML
           })
         });
         
         const result = await response.json();
         return result.success;
       } catch (error) {
         console.error('Error saving component:', error);
         return false;
       }
     }

     private combineComponentData(component: Component, data: ComponentData): string {
       // Implementation omitted for brevity
       return '';
     }
   }
   ```

### Step 2: Implement UI Components

1. **Create Toast.ts**
   ```typescript
   // src/components/ui/Toast.ts
   export type ToastType = 'success' | 'error' | 'info' | 'warning';

   export class Toast {
     private toastElement: HTMLElement;
     private titleElement: HTMLElement;
     private messageElement: HTMLElement;
     private iconElement: HTMLElement;
     private timeoutId: number | null = null;

     constructor() {
       this.toastElement = document.getElementById('toast') as HTMLElement;
       this.titleElement = document.getElementById('toastTitle') as HTMLElement;
       this.messageElement = document.getElementById('toastMessage') as HTMLElement;
       this.iconElement = document.getElementById('toastIcon') as HTMLElement;
       
       document.getElementById('toastClose')?.addEventListener('click', () => {
         this.hide();
       });
     }

     show(type: ToastType, title: string, message: string, duration: number = 3000): void {
       this.toastElement.className = `toast active toast-${type}`;
       this.titleElement.textContent = title;
       this.messageElement.textContent = message;
       
       switch (type) {
         case 'success': this.iconElement.textContent = 'check_circle'; break;
         case 'error': this.iconElement.textContent = 'error'; break;
         case 'info': this.iconElement.textContent = 'info'; break;
         case 'warning': this.iconElement.textContent = 'warning'; break;
       }
       
       if (this.timeoutId) clearTimeout(this.timeoutId);
       this.timeoutId = window.setTimeout(() => this.hide(), duration);
     }

     hide(): void {
       this.toastElement.className = 'toast';
     }
   }
   ```

2. **Create Editor.ts**
   ```typescript
   // src/components/Editor.ts
   import { ComponentData } from '../core/AppState';
   import CodeMirror from 'codemirror';
   import 'codemirror/mode/htmlmixed/htmlmixed';
   import 'codemirror/mode/css/css';
   import 'codemirror/mode/javascript/javascript';

   export class Editor {
     private editor: CodeMirror.Editor;
     private tabElements: NodeListOf<Element>;
     private currentTab: 'html' | 'css' | 'js' = 'html';
     private contentData: ComponentData = { html: '', css: '', js: '' };
     private changeCallback: () => void;

     constructor(
       editorElement: HTMLTextAreaElement,
       tabElements: NodeListOf<Element>,
       changeCallback: () => void
     ) {
       this.tabElements = tabElements;
       this.changeCallback = changeCallback;
       
       this.editor = CodeMirror.fromTextArea(editorElement, {
         mode: 'htmlmixed',
         theme: 'dracula',
         lineNumbers: true,
         // Other options omitted for brevity
       });
       
       this.editor.on('change', () => {
         this.saveCurrentTabContent();
         this.changeCallback();
       });
       
       this.attachTabEventListeners();
     }

     setContent(data: ComponentData): void {
       this.contentData = {...data};
       this.setActiveTab(this.currentTab);
     }

     getContent(): ComponentData {
       this.saveCurrentTabContent();
       return this.contentData;
     }

     private attachTabEventListeners(): void {
       this.tabElements.forEach(tab => {
         tab.addEventListener('click', () => {
           const tabName = tab.getAttribute('data-tab') as 'html' | 'css' | 'js';
           this.setActiveTab(tabName);
         });
       });
     }

     private setActiveTab(tab: 'html' | 'css' | 'js'): void {
       this.saveCurrentTabContent();
       this.currentTab = tab;
       
       // Update tab UI
       this.tabElements.forEach(tabEl => {
         if (tabEl.getAttribute('data-tab') === tab) {
           tabEl.classList.add('active');
         } else {
           tabEl.classList.remove('active');
         }
       });
       
       // Update editor content and mode
       switch (tab) {
         case 'html':
           this.editor.setValue(this.contentData.html);
           this.editor.setOption('mode', 'htmlmixed');
           break;
         case 'css':
           this.editor.setValue(this.contentData.css);
           this.editor.setOption('mode', 'css');
           break;
         case 'js':
           this.editor.setValue(this.contentData.js);
           this.editor.setOption('mode', 'javascript');
           break;
       }
     }

     private saveCurrentTabContent(): void {
       if (!this.currentTab) return;
       
       const content = this.editor.getValue();
       switch (this.currentTab) {
         case 'html': this.contentData.html = content; break;
         case 'css': this.contentData.css = content; break;
         case 'js': this.contentData.js = content; break;
       }
     }
   }
   ```

### Step 3: Implement Core Application

1. **Create DevPreview.ts**
   ```typescript
   // src/core/DevPreview.ts
   import appState, { Component } from './AppState';
   import { ComponentList } from '../components/ComponentList';
   import { Editor } from '../components/Editor';
   import { Preview } from '../components/Preview';
   import { ResizableLayout } from '../components/ResizableLayout';
   import { Toast } from '../components/ui/Toast';
   import { ComponentRegistry } from '../services/ComponentRegistry';
   import { StorageService } from '../services/StorageService';
   import { APIService } from '../services/APIService';
   import { RealTimePreview } from '../features/RealTimePreview';
   import { CodeFormatter } from '../services/CodeFormatter';

   export class DevPreview {
     private componentList: ComponentList;
     private editor: Editor;
     private preview: Preview;
     private layout: ResizableLayout;
     private toast: Toast;
     private componentRegistry: ComponentRegistry;
     private storageService: StorageService;
     private apiService: APIService;
     private codeFormatter: CodeFormatter;
     private realTimePreview: RealTimePreview;
     
     constructor() {
       // Initialize services
       this.toast = new Toast();
       this.storageService = new StorageService();
       this.apiService = new APIService();
       this.componentRegistry = new ComponentRegistry();
       this.codeFormatter = new CodeFormatter();
       
       // Initialize UI components
       this.editor = new Editor(
         document.getElementById('codeEditor') as HTMLTextAreaElement,
         document.querySelectorAll('.editor-tab'),
         this.handleEditorChange.bind(this)
       );
       
       this.preview = new Preview(
         document.getElementById('previewFrame') as HTMLIFrameElement,
         document.querySelectorAll('.device-btn'),
         document.getElementById('sizeIndicator') as HTMLElement
       );
       
       this.componentList = new ComponentList(
         document.getElementById('componentList') as HTMLElement,
         document.getElementById('locationFilter') as HTMLSelectElement,
         document.getElementById('componentSearch') as HTMLInputElement,
         this.handleComponentSelect.bind(this)
       );
       
       this.layout = new ResizableLayout({
         container: document.querySelector('.editor-preview-container') as HTMLElement,
         leftPanel: document.getElementById('editorContainer') as HTMLElement,
         rightPanel: document.getElementById('previewContainer') as HTMLElement,
         handle: document.getElementById('resizeHandle') as HTMLElement
       });
       
       // Initialize features
       this.realTimePreview = new RealTimePreview(this.editor, this.preview);
       
       // Attach button event listeners
       this.attachEventListeners();
       
       // Initialize app
       this.initApp();
     }
     
     private async initApp(): Promise<void> {
       try {
         // Initialize component registry
         await this.componentRegistry.initialize();
         
         // Load component list
         const components = this.componentRegistry.getAllComponents();
         this.componentList.setComponents(components);
         
         // Try to load last edited component
         const lastComponent = this.storageService.getLastEditedComponent();
         if (lastComponent) {
           this.loadComponent(lastComponent);
         }
       } catch (error) {
         console.error('Error initializing app:', error);
         this.toast.show('error', 'Error', 'Failed to initialize application');
       }
     }
     
     private handleComponentSelect(component: Component): void {
       if (appState.isEditorDirty) {
         if (!confirm('You have unsaved changes. Load new component anyway?')) {
           return;
         }
       }
       
       this.loadComponent(component);
     }
     
     private async loadComponent(component: Component): Promise<void> {
       try {
         let componentData;
         
         if (component.locationType === 'local') {
           componentData = this.storageService.loadComponent(component.id);
         } else {
           componentData = await this.componentRegistry.getComponentContent(component);
         }
         
         appState.setState({
           currentComponent: component,
           componentData,
           isEditorDirty: false
         });
         
         this.editor.setContent(componentData);
         this.preview.update(componentData);
         
         this.updateStatusMessage(`Component loaded from ${component.locationType}`);
       } catch (error) {
         console.error('Error loading component:', error);
         this.toast.show('error', 'Error', `Failed to load component: ${error.message}`);
       }
     }
     
     private handleEditorChange(): void {
       appState.setState({ isEditorDirty: true });
       this.updateStatusMessage('Changes not saved');
     }
     
     private updateStatusMessage(message: string): void {
       const statusElement = document.getElementById('statusMessage');
       if (statusElement) {
         statusElement.textContent = message;
       }
     }
     
     private attachEventListeners(): void {
       // Implementation omitted for brevity
     }
   }
   ```

### Step 4: Feature Implementations

1. **Create RealTimePreview.ts**
   ```typescript
   // src/features/RealTimePreview.ts
   import { Editor } from '../components/Editor';
   import { Preview } from '../components/Preview';

   export class RealTimePreview {
     private editor: Editor;
     private preview: Preview;
     private debounceTime: number;
     private updateTimer: number | null = null;
     private enabled: boolean;

     constructor(
       editor: Editor,
       preview: Preview,
       options: { debounceTime?: number; enabled?: boolean } = {}
     ) {
       this.editor = editor;
       this.preview = preview;
       this.debounceTime = options.debounceTime || 1000;
       this.enabled = options.enabled ?? true;
       
       this.initialize();
     }

     private initialize(): void {
       // Listen for editor changes
       this.editor.addEventListener('change', () => {
         if (!this.enabled) return;
         
         // Debounce the preview update
         if (this.updateTimer) {
           clearTimeout(this.updateTimer);
         }
         
         this.updateTimer = window.setTimeout(() => {
           const content = this.editor.getContent();
           this.preview.update(content);
         }, this.debounceTime);
       });
     }

     enable(): void {
       this.enabled = true;
     }

     disable(): void {
       this.enabled = false;
     }

     setDebounceTime(time: number): void {
       this.debounceTime = time;
     }
   }
   ```

### Step 5: Main Entry Point

1. **Create index.ts**
   ```typescript
   // src/index.ts
   import { DevPreview } from './core/DevPreview';

   document.addEventListener('DOMContentLoaded', () => {
     window.devPreview = new DevPreview();
   });
   ```

## Testing Strategy

1. **Unit Tests**
   - Create tests for each service and utility
   - Use Jest for testing framework

2. **Component Tests**
   - Test UI components in isolation
   - Mock dependencies

3. **Integration Tests**
   - Test how modules work together
   - Focus on key user flows

## Incremental Migration

1. **Start with new files alongside existing code**
2. **Migrate one module at a time**
3. **Add comprehensive logging**
4. **Use feature flags for gradual deployment**

## Code Quality Guidelines

1. **TypeScript Best Practices**
   - Use interfaces for clear contracts
   - Avoid `any` type
   - Use access modifiers (private, protected, public)

2. **Documentation**
   - JSDoc comments for all public methods
   - README.md for each module folder
   - API documentation for external interfaces

3. **Error Handling**
   - Consistent error handling across modules
   - User-friendly error messages
   - Error logging for debugging

## Future Enhancements

1. **State Management**
   - Consider Redux or MobX for more complex state
   
2. **Component Framework**
   - Consider adopting a component framework like React/Vue

3. **Performance Optimization**
   - Lazy loading for features
   - Caching for component registry

## Timeline

- **Week 1**: Set up project, create core services
- **Week 2**: Implement UI components and editor
- **Week 3**: Implement features and preview
- **Week 4**: Testing, documentation, and deployment

This implementation guide provides a roadmap for transforming the monolithic DevPreview code into a modern, modular codebase that's easier to maintain and extend.