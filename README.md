# Eh Eh Scene

A level editor I started on to have something to visually layout a game, and then use data output to create the game scene via code. I found with a previous project that positioning everything manually in the game code did not feel very scalable. With my current project I'm more exploring using the Godot game engine, which obviously has the functionality I need.

Assuming I return to this project at some point, the goals with this editor is to keep it simpler and more focused than a full fledged engine:

* Import a 2d map created via Tiled (working for orthogonal)
* Able to define components with properties, and entity types that use these components
* Instance entity types in the game scene, positioning them and overriding values as desired.
* Define shapes for things like collision detection, enemy sight range, or whatever other things one might want to define shapes with a component for.
