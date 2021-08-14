# reveal-md-mermaid-animation-example
This repository contains an example that demonstrates how to animate
([mermaid]) diagrams in ([reveal-md]) presentations using [fragments].
The approach adds classes and data attributes to the rendered graph (svg)
elements. It may also be used in [reveal.js].

[mermaid]: https://github.com/mermaid-js/mermaid
[reveal-md]: https://github.com/webpro/reveal-md
[fragments]: https://revealjs.com/fragments/
[reveal.js]: https://revealjs.com/

## Goal of this project

My goal is to create a library that can be installed using npm.
Therefore, I would like to collect requirements.
Please create an issue to add your requirements and join the discussion.
For example, one important point of discussion is, how/where the animations
should be defined or associated with the graph (elements).

I've implemented two approaches:
1. Define a JavaScript function (see
   [reveal-mermaid-animation-handlers.js](./reveal-mermaid-animation-handlers.js))
   that calls the API of the library (see
   [reveal-mermaid-animation.js](./lib/reveal-mermaid-animation.js))
2. Define a code block in a new/custom language (`mermaid-animation`),
   which is translated in API calls by the library.
   For example, after the code block (language `mermaid`) of your graph
   
   ```mermaid
   graph TD;
       A-->B;
   ```
    
   you define the animation (order) of nodes and edges in another
   code block (language `mermaid`) on the same slide
    
   ```mermaid-animation
   A
   A-->B B
   ```
   
   The line number defines, in which step a node/edge should be shown in the
   animation (i.e. adds class `fragment` and sets attribute
   `data-fragment-index` on the SVG element of the rendered node/edge).
   In the example, Node `A` is shown in the first step,
   the edge `A-->B` and the node `B` are shown in the second step.

## How to run
```bash
npm install
npm start
```

Open http://localhost:1948/presentation.md

---

Thanks to the authors of [reveal-md-scripts]. I'm using a modified version
of their [reveal-mermaid.js]. I dispatch events, when the graph is rendered
or attached.

[reveal-md-scripts]: https://github.com/amra/reveal-md-scripts
[reveal-mermaid.js]: https://github.com/amra/reveal-md-scripts/blob/f7cf21ecb3bb959c3c17a12a57fbc03e9addb24f/mermaidjs/reveal-mermaid.js
