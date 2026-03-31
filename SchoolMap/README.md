USANT Campus Pathfinder
A modern, web-based navigation tool for the University of Saint Anthony campus. This application uses Dijkstra’s Algorithm to calculate the shortest walking paths between campus buildings, featuring a sleek Glassmorphic UI and interactive map.

Features
Shortest Path Calculation: Finds the most efficient route between two points using graph theory.

Interactive Mapping: Click directly on the campus map to set your "From" and "To" locations.

Glassmorphism UI: A modern, frosted-glass interface with background blurs and aesthetic typography.

Live Instructions: A built-in sidebar guide for new users.

Real-time Tooltips: Hover over buildings to see their full names and coordinates.

Tech Stack
HTML5 & Canvas: For rendering the interactive map and drawing dynamic paths.

CSS3 (Glassmorphism): Utilizes backdrop-filter and advanced gradients for a modern look.

Vanilla JavaScript: Implements the core Dijkstra algorithm and DOM manipulation without external libraries.

Google Fonts: Poppins and Montserrat for clean, architectural typography.

 How It Works
The campus is modeled as a Graph where:

Nodes: Represent buildings (e.g., University Chapel, Admin Bldg).

Edges: Represent the actual walking paths/roads on campus.

Weights: Are calculated based on the pixel distance between nodes to ensure the "Shortest Path" looks natural on the map.

Screenshots
(Tip: Add a screenshot of your live app here!)
![App Preview](link-to-your-screenshot.png)

 Installation
To run this project locally:

Clone the repository:


git clone https://github.com/sachivinsmokes/SchoolPaths.git
Open index.html in any modern web browser.
