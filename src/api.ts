import { Platform } from 'react-native';
import { Customer, Video } from './data';

// Set EXPO_PUBLIC_API_URL in .env (e.g. http://192.168.1.20:4000 for a phone on your Wi-Fi).
// Android emulator can reach the host machine at 10.0.2.2.
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? (Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000');

// Token from the invitation link. Until deep links are wired up, a demo token is used.
export const DEMO_INVITE_TOKEN = 'tok_sarah';

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + path, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as any).error || `Request failed (${res.status})`);
  return body as T;
}

export const api = {
  customers: () => req<Customer[]>('/api/customers'),
  setCustomerStatus: (id: string, status: Customer['status']) =>
    req<Customer>(`/api/customers/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) }),
  videos: () => req<(Video & { url?: string })[]>('/api/videos'),
  updateVideo: (id: string, patch: { status?: Video['status']; platforms?: string[] }) =>
    req<Video>(`/api/videos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) }),
  invite: (token: string) => req<{ business: string; customer: string; script: string[] }>(`/api/invites/${token}`),
};

export type Consent = { agreed: boolean; agreedAt: string; singleSession: boolean; platform: string };

/** Uploads the recorded file with progress. XHR is used because fetch has no upload progress. */
export function uploadVideo(token: string, fileUri: string, consent: Consent, duration: string, onProgress?: (p: number) => void): Promise<{ id: string }> {
  return new Promise(async (resolve, reject) => {
    try {
      const form = new FormData();
      if (Platform.OS === 'web') {
        const blob = await (await fetch(fileUri)).blob();
        form.append('video', blob, 'testimonial.webm');
      } else {
        const ext = fileUri.split('.').pop() || 'mp4';
        form.append('video', { uri: fileUri, name: `testimonial.${ext}`, type: ext === 'mov' ? 'video/quicktime' : 'video/mp4' } as any);
      }
      form.append('consent', JSON.stringify(consent));
      form.append('duration', duration);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_URL}/api/invites/${token}/video`);
      xhr.timeout = 5 * 60 * 1000;
      xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress?.(e.loaded / e.total); };
      xhr.onload = () => {
        let body: any = {};
        try { body = JSON.parse(xhr.responseText); } catch {}
        xhr.status >= 200 && xhr.status < 300 ? resolve(body) : reject(new Error(body.error || `Upload failed (${xhr.status})`));
      };
      xhr.onerror = () => reject(new Error('Could not reach the server. Check your connection and try again.'));
      xhr.ontimeout = () => reject(new Error('The upload took too long. Please try again on a better connection.'));
      xhr.send(form);
    } catch (e: any) {
      reject(e);
    }
  });
}
