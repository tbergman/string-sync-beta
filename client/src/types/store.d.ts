declare namespace Store {
  interface Viewport {
    width: number;
    height: number;
    orientation: Orientation;
    type: ViewportType;
    isTouch: boolean;
  }

  interface Session {
    currentUser: User;
    isLoggedIn: boolean
  }

  interface Features {
    fretboard: boolean;
    autoSave: boolean;
    scaleVisualization: boolean;
    navbar: boolean;
    gradient: boolean;
  }

  interface Notation {
    id: number;
    songName: string;
    durationMs: number;
    deadTimeMs: number;
    bpm: number;
    transcriber: User;
    artistName: string;
    thumbnailUrl: string;
    vextabString: string;
    youtubeVideoId?: string;
    tags: Array<string>;
  }

  type Notations = Array<PresentationalNotation>

  type Tags = Array<Tag>

  interface Sync {
    maestro: any;
    rafLoop: any;
  }

  interface Tab {
    instance: any;
    updatedAt: number;
  }

  interface Video {
    player: VideoPlayer;
    playerState: string;
    isActive: boolean;
  }
}
