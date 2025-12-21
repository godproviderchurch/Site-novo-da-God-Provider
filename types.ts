export interface Ministry {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Location {
  id: string;
  city: string;
  address: string;
  serviceTimes: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string;
}