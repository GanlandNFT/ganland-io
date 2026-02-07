/**
 * X/Twitter OAuth 2.0 Callback Handler
 * Handles the redirect after user authorization
 * 
 * Endpoint: /api/auth/callback
 */

export const config = {
  runtime: 'edge',
};

const X_CLIENT_ID = process.env.X_CLIENT_ID;
const X_CLIENT_SECRET = process.env.X_CLIENT_SECRET;
const CALLBACK_URI = 'https://ganland.io/api/auth/callback';

export default async function handler(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle errors from X
  if (error) {
    console.error('OAuth Error:', error, errorDescription);
    return Response.redirect(
      `https://ganland.ai/auth/error?error=${encodeURIComponent(error)}&description=${encodeURIComponent(errorDescription || '')}`,
      302
    );
  }

  // Validate required params
  if (!code) {
    return Response.redirect(
      'https://ganland.ai/auth/error?error=missing_code',
      302
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${X_CLIENT_ID}:${X_CLIENT_SECRET}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: CALLBACK_URI,
        code_verifier: state // PKCE code verifier passed in state
      })
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return Response.redirect(
        'https://ganland.ai/auth/error?error=token_exchange_failed',
        302
      );
    }

    const tokens = await tokenResponse.json();
    
    // Get user info
    const userResponse = await fetch('https://api.twitter.com/2/users/me', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`
      }
    });

    const userData = await userResponse.json();
    
    // Redirect to ganland.ai with success
    // In production, you'd store tokens securely and create a session
    return Response.redirect(
      `https://ganland.ai/auth/success?user=${encodeURIComponent(userData.data?.username || 'unknown')}`,
      302
    );

  } catch (err) {
    console.error('OAuth callback error:', err);
    return Response.redirect(
      'https://ganland.ai/auth/error?error=server_error',
      302
    );
  }
}
