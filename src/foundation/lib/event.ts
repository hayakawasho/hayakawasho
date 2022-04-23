import mitt from "mitt";
import {
  LOADING_PROGRESS,
  LOADING_DONE,
  LOADING_TIMEOUT,
  AFTER_PAGE_READY,
  PJAX_ENTER,
  PJAX_LEAVE,
  WINDOW_RESIZE,
} from "@/foundation/const";

type EventsType = {
  [LOADING_PROGRESS]: {
    progress: number;
  };
  [LOADING_DONE]: {
    done: number;
  };
  [LOADING_TIMEOUT]: {
    id: string;
    timeout: number;
  };
  [AFTER_PAGE_READY]: undefined;
  [PJAX_LEAVE]: {
    from: HTMLElement;
  };
  [PJAX_ENTER]: {
    to: HTMLElement;
  };
  [WINDOW_RESIZE]: {
    windowH: number;
    screenW: number;
    screenH: number;
  };
};

const eventbus = mitt<EventsType>();

export { eventbus };
