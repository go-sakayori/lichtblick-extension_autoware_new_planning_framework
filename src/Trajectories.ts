import { Header } from "./Header";
import { TrajectoryPoint } from "./TrajectoryPoint";

export type Trajectories = {
  trajectories: {
    header: Header;
    generator_id: {
      uuid: Uint8Array;
    };
    points: TrajectoryPoint[];
    score: number;
  }[];
  generator_info: {
    generator_id: {
      uuid: Uint8Array;
    };
    generator_name: string;
  }[];
};
