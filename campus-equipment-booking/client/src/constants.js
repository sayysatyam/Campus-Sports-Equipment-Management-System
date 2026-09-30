export const SPORTS = [
  "Football",
  "Basketball",
  "Cricket",
  "Badminton",
  "Table Tennis",
  "Volleyball",
  "Athletics",
  "Kabaddi",
  "Gym",
  "Chess",
];
export const TIME_SLOTS = [
  "7:00–8:00 AM",
  "8:00–9:00 AM",
  "9:00–10:00 AM",
  "10:00–11:00 AM",
  "11:00 AM–12:00 PM",
  "12:00–1:00 PM",
  "1:00–2:00 PM",
  "2:00–3:00 PM",
  "3:00–4:00 PM",
  "4:00–5:00 PM",
  "5:00–6:00 PM",
  "6:00–7:00 PM",
];
export const PURPOSES = ["Practice", "Tournament", "Event"];
export const SPORT_ICON = {
  Football: "⚽",
  Basketball: "🏀",
  Cricket: "🏏",
  Badminton: "🏸",
  "Table Tennis": "🏓",
  Volleyball: "🏐",
  Athletics: "🏃",
  Kabaddi: "🤼",
  Gym: "🏋️",
  Chess: "♟️",
};
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
