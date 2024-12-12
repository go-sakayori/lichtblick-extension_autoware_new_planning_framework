import { Header } from "./Header";
import { Position } from "./Position";
import { Orientation } from "./Orientation";

export type Trajectories = {
    trajectories: {
        header: Header;
        generator_id: {
            uuid: Uint8Array;
        };
        points: {
            time_from_start: {
                sec: number;
                nsec: number;
            };
            pose: {
                position: Position;
                orientation: Orientation;
            };
            longitudinal_velocity_mps: number;
            lateral_velocity_mps: number;
            acceleration_mps2: number;
            heading_rate_rps: number;
            front_wheel_angle_rad: number;
            rear_wheel_angle_rad: number;
        }[];
        score: number;
    }[];
    generator_info: {
        generator_id: {
            uuid: Uint8Array;
        };
        generator_name: string;
    }[];
}