# Diagrams

---

## Simple Diagram
Press right/left arrow key to show next/previous part of the diagram.

<!-- Diagram with animation defined as script -->
<!-- that is associated by graph name -->
<!-- defined in attribute of parent or ancestor element -->

<div data-mermaid-graph-name="simple">

```mermaid
graph TD;
   A-->B;
```

</div>

---

## Flow Chart
### animation defined in script

Press right/left arrow key to show next/previous part of the diagram.

<!-- Diagram with animation defined as script -->
<!-- that is associated by graph index -->

```mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

---

## Flow Chart
### animation defined in code block

Press right/left arrow key to show next/previous part of the diagram.

<!-- Diagram with animation defined as code block (mermaid-animation)  -->
<!-- on the same slide as diagram -->

```mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```

```mermaid-animation
A
A-->B B 
B-->C C
C-->D D C-->E E C-->F F
```
