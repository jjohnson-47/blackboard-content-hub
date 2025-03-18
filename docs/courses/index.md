---
layout: page
title: Courses
permalink: /courses/
---

# Available Courses

This page lists all available courses with interactive components.

<div class="courses-list">
  <ul>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a151/">
        <strong>College Algebra</strong>
      </a>
      <p>Interactive components for College Algebra (MATH A151)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a152/">
        <strong>Trigonometry</strong>
      </a>
      <p>Interactive components for Trigonometry (MATH A152)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a221/">
        <strong>Applied Calculus for Managerial and Social Sciences</strong>
      </a>
      <p>Interactive components for Applied Calculus (MATH A221)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a251/">
        <strong>Calculus I</strong>
      </a>
      <p>Interactive components for Calculus I (MATH A251)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a252/">
        <strong>Calculus II</strong>
      </a>
      <p>Interactive components for Calculus II (MATH A252)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/math-a253/">
        <strong>Calculus III</strong>
      </a>
      <p>Interactive components for Calculus III (MATH A253)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/stat-a253/">
        <strong>Applied Statistics for the Sciences</strong>
      </a>
      <p>Interactive components for Applied Statistics (STAT A253)</p>
    </li>
    <li>
      <a href="{{ site.baseurl }}/courses/general/">
        <strong>General Components</strong>
      </a>
      <p>General-purpose components that can be used across multiple courses</p>
    </li>
  </ul>
</div>

<style>
.courses-list ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.courses-list li {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.courses-list a {
  color: #4a148c;
  text-decoration: none;
}

.courses-list a:hover {
  text-decoration: underline;
}

.courses-list p {
  margin-top: 10px;
  color: #555;
}
</style>