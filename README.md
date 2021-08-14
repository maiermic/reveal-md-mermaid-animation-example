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
One important point of discussion, for example, is how/where the animations
should be defined or associated with the graph (elements).

I've implemented two approaches:
1. Define a JavaScript function (see
   [reveal-mermaid-animation-handlers.js](./reveal-mermaid-animation-handlers.js))
   that calls the API of the library (see
   [reveal-mermaid-animation.js](./lib/reveal-mermaid-animation.js))
2. Define a code block in a custom language. For example, after the code block
   of your graph
   
   ```mermaid
   graph TD;
       A-->B;
   ```
    
   you define the animation order of nodes and edges like this   
    
   ```mermaid-animation
   A
   A-->B B
   ```
    
   Node `A` should be shown in the first step,
   the edge `A-->B` and the node `B` in the second step.

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
