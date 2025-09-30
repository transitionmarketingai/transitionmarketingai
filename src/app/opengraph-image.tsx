import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Transition Marketing AI - Automated AI Marketing Systems';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(45deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
            }}
          >
            Transition Marketing AI
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#64748b',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            Get qualified leads, consistent content, and smart AI tools in one subscription. Built for Indian SMBs.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '40px',
              fontSize: '24px',
              color: '#2563eb',
            }}
          >
            🚀 No hiring. No hassle.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
