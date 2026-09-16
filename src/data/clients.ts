export interface Client {
  id: string;
  name: string;
  category: string;
  surface: 'white' | 'black' | 'kraft';
  project?: { title: string; year?: string; role: string; summary: string; audio?: string; video?: string };
}
// Names/categories retained from the original page. Add verified case details
// and publishable media here; do not invent projects, credits or endorsements.
export const clients: Client[] = [
  { id: 'netflix', name: 'NETFLIX', category: 'Series', surface: 'white' },
  { id: 'a24', name: 'A24', category: 'Films', surface: 'black' },
  { id: 'hbo', name: 'HBO MAX', category: 'Documental', surface: 'white' },
  { id: 'mccann', name: 'McCANN', category: 'Spot TV', surface: 'kraft' },
  { id: 'vogue', name: 'VOGUE', category: 'Fashion film', surface: 'white' },
  { id: 'bbdo', name: 'BBDO', category: 'Campaña digital', surface: 'kraft' },
];
