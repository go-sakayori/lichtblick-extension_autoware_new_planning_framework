import {
  SceneUpdate,
  LinePrimitive,
  LineType,
  Point3,
  PosesInFrame,
  Pose,
} from "@foxglove/schemas";
import { Trajectories } from "./Trajectories";
import { TrajectoryPoint } from "./TrajectoryPoint";
import { ExtensionContext } from "@lichtblick/suite";
import { Trajectory } from "./Trajectory";

function createLinePrimitive(msg: TrajectoryPoint[]): LinePrimitive {
  const points: Point3[] = [];
  for (let i = 0; i < msg.length; i++) {
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
        lifetime: { sec: 0, nsec: 150000000 },
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

function convertTrajectory(msg: Trajectory): PosesInFrame {
  const frame_id = msg.header.frame_id;
  const timestamp = msg.header.stamp;
  const points = msg.points;

  const poses: Pose[] = [];

  for (let i = 0; i < points.length; i++) {
    poses.push({
      position: {
        x: points[i]?.pose.position.x || 0.0,
        y: points[i]?.pose.position.y || 0.0,
        z: points[i]?.pose.position.z || 0.0,
      },
      orientation: {
        y: points[i]?.pose.orientation.y || 0.0,
        z: points[i]?.pose.orientation.z || 0.0,
        x: points[i]?.pose.orientation.x || 0.0,
        w: points[i]?.pose.orientation.w || 0.0,
      },
    });
  }

  return {
    frame_id,
    timestamp,
    poses,
  };
}

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerMessageConverter({
    fromSchemaName: "autoware_new_planning_msgs/msg/Trajectories",
    toSchemaName: "foxglove.SceneUpdate",
    converter: convertTrajectories,
  });
  extensionContext.registerMessageConverter({
    fromSchemaName: "autoware_planning_msgs/msg/Trajectory",
    toSchemaName: "foxglove.PosesInFrame",
    converter: convertTrajectory,
  });
}
