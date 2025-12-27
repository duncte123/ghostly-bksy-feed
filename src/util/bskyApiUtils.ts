export async function fetchDid(handle: string) {
  const res = await fetch(`https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`);
  const json = (await res.json()) as { did: string };

  return json.did;
}