export enum Event {
  TOGGLE_LEFT_SIDEBAR,
  TOGGLE_POST_TAGS,
  SHOW_TOAST
}

type onShowToastCallback = (title: string) => void;
type onTogglePostTags = () => void;
type onToggleLeftSideBar = () => void;

type Callback = onShowToastCallback | onTogglePostTags;

interface EventManager {
  list: Map<Event, Callback[]>;
  on(event: Event.SHOW_TOAST, callback: onShowToastCallback);
  on(event: Event.TOGGLE_POST_TAGS, callback: onTogglePostTags);
  on(event: Event.TOGGLE_LEFT_SIDEBAR, callback: onToggleLeftSideBar);
  emit(event: Event.SHOW_TOAST, title: string);
  emit(event: Event.TOGGLE_POST_TAGS, val?: undefined);
  emit(event: Event.TOGGLE_LEFT_SIDEBAR, val?: undefined);
}

export const eventManager: EventManager = {
  list: new Map(),
  on(event, callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list.get(event).push(callback);
  },
  emit(event, data) {
    if (this.list.has(event)) {
      this.list.get(event).forEach(cb => cb(data));
    }
  }
};