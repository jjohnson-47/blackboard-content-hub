---
layout: default
title: Desmos API
nav_order: 3
parent: Developer Guide
has_children: true
---

# Desmos API Documentation

This section contains comprehensive reference documentation for the Desmos APIs used within the Blackboard Content Hub. These materials serve as a technical reference for developers implementing interactive mathematical components.

## Available Documentation

| API | Version | Description |
|-----|---------|-------------|
| [Calculator API](./calculator-v1.10/reference.md) | v1.10 | Standard Desmos graphing calculator API |
| [Geometry API](./geometry-v1.10/reference.md) | v1.10 | Desmos geometry tool API |
| [3D Graphing API](./3d-graphing-v1.11/reference.md) | v1.11 | Desmos 3D graphing calculator API |

## Master Reference and Strategy

| Document | Description |
|----------|-------------|
| [Master Reference](./master-reference.md) | Comprehensive reference for all Desmos APIs with query examples |
| [Strategy](./strategy.md) | Documentation strategy and query templates for Desmos APIs |
| [Overview](./overview.md) | General overview of the Desmos APIs and when to use them |

## Implementation Guidelines

When implementing Desmos components in the content hub:

1. Always use the specified API version to ensure compatibility
2. Follow the [iframe integration guidelines](../iframe-integration.md) for proper embedding
3. Implement appropriate error handling and fallback content
4. Test across different browsers and devices to ensure consistent behavior

## Additional Resources

- [Desmos Official Documentation](https://www.desmos.com/api/v1.10/docs/)
- [Desmos API Examples](https://www.desmos.com/api/v1.10/examples/)