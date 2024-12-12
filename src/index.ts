import { PosesInFrame, Pose } from "@foxglove/schemas";
import { Trajectories } from "./Trajectories";
import { ExtensionContext } from "@lichtblick/suite";

function convertTrajectories(msg: Trajectories): PosesInFrame {
  const { trajectories } = msg;

  const frame_id = trajectories[0]?.header.frame_id || "";
  const timestamp = trajectories[0]?.header.stamp || { sec: 0, nsec: 0 };

  // `trajectories` の各データを解構
  const poses: Pose[] = trajectories.flatMap((trajectory) => {
    const { points } = trajectory;

    // 各 `point` を `pose` に変換
    return points.map((point) => ({
      position: {
        x: point.pose.position.x,
        y: point.pose.position.y,
        z: point.pose.position.z,
      },
      orientation: {
        x: point.pose.orientation.x,
        y: point.pose.orientation.y,
        z: point.pose.orientation.z,
        w: point.pose.orientation.w,
      },
    }));
  });

  return {
    frame_id,
    timestamp,
    poses,
  };
}

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerMessageConverter({
    fromSchemaName: "autoware_new_planning_msgs/msg/Trajectories",
    toSchemaName: "foxglove.PosesInFrame",
    converter: convertTrajectories,
  });
}
