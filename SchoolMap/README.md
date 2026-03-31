# 🗺️ USANT Campus Pathfinder

A modern, web-based navigation tool for the **University of Saint Anthony** campus.  
This application uses **Dijkstra’s Algorithm** to calculate the shortest walking paths between campus buildings, featuring a sleek **Glassmorphic UI** and interactive map.

---

## ✨ Features

- **Shortest Path Calculation**  
  Finds the most efficient route between two points using graph theory.

- **Interactive Mapping**  
  Click directly on the campus map to set your **"From"** and **"To"** locations.

- **Glassmorphism UI**  
  A modern, frosted-glass interface with background blurs and aesthetic typography.

- **Live Instructions**  
  A built-in sidebar guide for new users.

- **Real-time Tooltips**  
  Hover over buildings to see their full names and coordinates.

---

## 🛠️ Tech Stack

- **HTML5 & Canvas**  
  For rendering the interactive map and drawing dynamic paths.

- **CSS3 (Glassmorphism)**  
  Utilizes `backdrop-filter` and advanced gradients for a modern look.

- **Vanilla JavaScript**  
  Implements Dijkstra’s Algorithm and DOM manipulation without external libraries.

- **Google Fonts**  
  *Poppins* and *Montserrat* for clean, architectural typography.

---

## ⚙️ How It Works

The campus is modeled as a **Graph**:

- **Nodes** → Represent buildings (e.g., University Chapel, Admin Building)  
- **Edges** → Represent walking paths/roads on campus  
- **Weights** → Based on pixel distance between nodes to ensure natural-looking routes  

This allows the system to compute the **shortest path visually and efficiently**.

---

## 📸 Screenshots

![App Preview](images/Screenshot1.png)
![Reference Map](images/UsantMapReferenceDataLocation.jpg)
![Screenshot 2](images/Screenshot2.png)
![Screenshot 3](images/Screenshot3.png)
![Screenshot 4](images/Screenshot4.jpg)

---

## 👨‍💻 Authors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/kabonkaru">
        <img src="https://github.com/kabonkaru.png" width="100px;" alt="John Carlo Landong"/>
        <br />
        <sub><b>John Carlo Landong</b></sub>
      </a>
      <br />
      <sub>💻 Developer</sub>
    </td>

    <td align="center">
      <a href="https://github.com/sachivinsmokes">
        <img src="https://github.com/sachivinsmokes.png" width="100px;" alt="JustDewish Pelecia Furio"/>
        <br />
        <sub><b>JustDewish Pelecia Furio</b></sub>
      </a>
      <br />
      <sub>🎨 UI/UX Design & 🗺️ Data Mapping</sub>
    </td>

    <td align="center">
      <a href="https://github.com/Mrkie-a">
        <img src="https://github.com/Mrkie-a.png" width="100px;" alt="Markie Evan Conjares"/>
        <br />
        <sub><b>Markie Evan Conjares</b></sub>
      </a>
      <br />
      <sub>📝 Documentation</sub>
    </td>
  </tr>
</table>

## 🚀 Installation

To run this project locally:

### 1. Clone the repository
```bash
git clone https://github.com/sachivinsmokes/SchoolPaths.git

---


