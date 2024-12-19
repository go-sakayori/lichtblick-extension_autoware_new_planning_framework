import { SceneUpdate, LinePrimitive, LineType, Point3 } from "@foxglove/schemas";
import { Trajectories } from "./Trajectories";
import { TrajectoryPoint } from "./TrajectoryPoint";
import { ExtensionContext } from "@lichtblick/suite";

function createLinePrimitive(msg: TrajectoryPoint[]): LinePrimitive {
  const points: Point3[] = [];
  for (let i = 1; i < msg.length; i++) {
    points.push({
      x: msg[i]?.pose.position.x || 0.0,
      y: msg[i]?.pose.position.y || 0.0,
      z: msg[i]?.pose.position.z || 0.0,
    });
  }

  return {
    type: LineType.LINE_STRIP,
    pose: {
      position: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
      },
      orientation: { x: 0, y: 0, z: 0, w: 1 },
    },
    thickness: 0.1,
    scale_invariant: false,
    points,
    color: { r: 1, g: 0, b: 1, a: 1 },
    colors: [],
    indices: [],
  };
}

function convertTrajectories(msg: Trajectories): SceneUpdate {
  const { trajectories } = msg;
  const linePrimitives: LinePrimitive[] = [];

  for (let i = 0; i < (trajectories.length || 0); i++) {
    const trajectory = trajectories[i];
    if (!trajectory || !trajectory.points) continue;
    const linePrimitive: LinePrimitive = createLinePrimitive(trajectory.points);
    linePrimitives.push(linePrimitive);
  }

  return {
    deletions: [],
    entities: [
      {
        timestamp: trajectories[0]?.header.stamp || { sec: 0, nsec: 0 },
        frame_id: trajectories[0]?.header.frame_id || "",
        id: "generated_paths",
        lifetime: { sec: 1.0, nsec: 0 },
        frame_locked: false,
        metadata: [],
        arrows: [],
        cubes: [],
        spheres: [],
        cylinders: [],
        lines: linePrimitives,
        triangles: [],
        texts: [],
        models: [],
      },
    ],
  };
}

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerMessageConverter({
    fromSchemaName: "autoware_new_planning_msgs/msg/Trajectories",
    toSchemaName: "foxglove.SceneUpdate",
    converter: convertTrajectories,
  });
}
