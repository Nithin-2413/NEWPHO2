// Email images configuration using Cloudinary URLs with optimizations
function createOptimizedCloudinaryUrl(baseUrl: string, width: number = 700): string {
  // Extract the version and public ID from the Cloudinary URL
  const match = baseUrl.match(/\/upload\/(v\d+)\/(.+)\.(jpg|png|jpeg)$/);
  if (!match) return baseUrl;
  
  const [, version, publicId, extension] = match;
  const cloudName = 'dwmybitme';
  
  // Create optimized URL with transformations
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},c_scale,q_auto:best,f_auto/${version}/${publicId}.${extension}`;
}

export function getEmailImages() {
  return {
    // Common footer image for all templates (optimized for email width)
    footerImage: createOptimizedCloudinaryUrl(
      'https://res.cloudinary.com/dwmybitme/image/upload/v1755175867/Black_Minimalist_Linkedin_Banner_tmtk7h.png',
      700
    ),
    
    // Admin response header image (green watercolor)
    adminHeaderImage: createOptimizedCloudinaryUrl(
      'https://res.cloudinary.com/dwmybitme/image/upload/v1755175843/Green_Watercolor_Elegant_Wedding_Banner_Landscape_tjpw6a.jpg',
      700
    ),
    
    // User response header image (pink and white floral)
    userHeaderImage: createOptimizedCloudinaryUrl(
      'https://res.cloudinary.com/dwmybitme/image/upload/v1755175842/Pink_and_White_Floral_Wedding_Banner_5_gqw6u8.jpg',
      700
    ),
    
    // Reply header image (pink and white floral for orders)
    replyHeaderImage: createOptimizedCloudinaryUrl(
      'https://res.cloudinary.com/dwmybitme/image/upload/v1755175889/Pink_and_White_Floral_Wedding_Banner_tosxqh.png',
      700
    )
  };
}

// Common footer for all email templates
function createCommonFooter(footerImageUrl: string): string {
  return `
    <!-- Common Footer -->
    <div style="width:100%;max-width:700px;margin:20px auto 0;padding:0 12px;text-align:center;box-sizing:border-box;">
      <img src="${footerImageUrl}" alt="The Written Hug Footer" style="width:100%;height:auto;display:block;" />
    </div>

    <div style="padding:12px 18px 20px 18px;text-align:center;font-size:12px;color:#666666;">
      <div>You are receiving this message because you or someone associated with this email interacted with The Written Hug.</div>
    </div>
  `;
}

// Create email templates matching the provided designs
export function createEmailTemplate(type: 'admin' | 'user' | 'reply', images: ReturnType<typeof getEmailImages>) {
  
  // Admin email template (for new submissions)
  if (type === 'admin') {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>The Written Hug — You've got a letter</title>
        </head>
        <body style="margin:0;padding:0;background:#ffffff;font-family:Arial, sans-serif;color:#333333;">

          <!-- Preheader -->
          <div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">
            Wakeup Chipmunk
          </div>

          <!-- Header Image -->
          <div style="width:100%;max-width:700px;margin:0 auto;padding:0 12px;text-align:center;box-sizing:border-box;">
            <img src="${images.adminHeaderImage}" alt="The Written Hug" style="width:100%;height:auto;display:block;" />
          </div>

          <div style="width:100%;padding:20px 12px;box-sizing:border-box;">
            <div style="width:100%;max-width:700px;margin:0 auto;border-radius:8px;overflow:hidden;border:1px solid #f0e6e6;background:#fff;">

              <!-- Title -->
              <h2 style="color:#ff6b6b;text-align:center;margin:18px 20px;font-size:20px;line-height:1.2;">
                The Written Hug has got a Letter from {NAME}
              </h2>

              <!-- Table -->
              <div style="display:flex;justify-content:center;padding:0 18px 18px 18px;">
                <table style="width:100%;max-width:700px;border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th colspan="2" style="background:linear-gradient(90deg,#ff6b6b,#ff9f43);color:#ffffff;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                          <tr>
                            <td style="padding:12px;font-size:14px;text-align:center;font-weight:700;">Field</td>
                            <td style="padding:12px;font-size:14px;text-align:center;font-weight:700;">Value</td>
                          </tr>
                        </table>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {CONTENT}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          ${createCommonFooter(images.footerImage)}

        </body>
      </html>
    `;
  }

  // User confirmation email template
  if (type === 'user') {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>The Written Hug — You've got a letter</title>
        </head>
        <body style="margin:0;padding:0;background:#ffffff;font-family:Arial, sans-serif;color:#333333;">

          <!-- Preheader -->
          <div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">
            Thanks for letting our kabootar carry your words to us
          </div>

          <!-- Header Image -->
          <div style="width:100%;max-width:700px;margin:0 auto;padding:0 12px;text-align:center;box-sizing:border-box;">
            <img src="${images.userHeaderImage}" alt="Thank You" style="width:100%;height:auto;display:block;" />
          </div>

          <div style="width:100%;padding:20px 12px;box-sizing:border-box;">
            <div style="width:100%;max-width:700px;margin:0 auto;border-radius:8px;overflow:hidden;border:1px solid #f0e6e6;background:#fff;">

              <!-- Title -->
              <h2 style="color:#ff6b6b;text-align:center;margin:18px 20px;font-size:20px;line-height:1.2;">
                The Written Hug has got {NAME} a Letter
              </h2>

              <!-- Content -->
              <div style="padding:0 18px 18px 18px;">
                {CONTENT}
              </div>

            </div>
          </div>

          ${createCommonFooter(images.footerImage)}

        </body>
      </html>
    `;
  }

  // Reply email template (for admin responses)
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>The Written Hug — Personal reply</title>

      <!-- Optional: most email clients ignore external fonts, but this won't trigger spam filters. -->
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    </head>

    <body style="margin:0;padding:0;background:#f8f7f6;font-family: 'Comic Sans MS', ComicSans, cursive, Arial, sans-serif; color:#333333;">

      <!-- Hidden preview / preheader -->
      <div style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">
        Written Hug Sent a Kabootar
      </div>

      <!-- Header Image -->
      <div style="width:100%;max-width:700px;margin:0 auto;padding:24px 12px 0;text-align:center;box-sizing:border-box;">
        <img src="${images.replyHeaderImage}" alt="Personal Reply" style="width:100%;height:auto;display:block;border-radius:10px 10px 0 0;" />
      </div>

      <div role="article" aria-label="The Written Hug reply" style="padding:0 12px 24px;">
        <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:0 0 10px 10px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.06);">

          <!-- Header -->
          <div style="padding:22px 20px;text-align:center;background:linear-gradient(90deg,#f16a85,#f78c9e,#f16a85);color:#ffffff;">
            <h1 style="margin:0;font-size:28px;font-family:'Great Vibes', 'Comic Sans MS', cursive;line-height:1.2;letter-spacing:0.5px;">
              You've Got a Written Hug
            </h1>
            <p style="margin:6px 0 0;font-size:14px;opacity:0.95;font-family:'Comic Sans MS', cursive, Arial, sans-serif;">
              A personal reply to your heartfelt message
            </p>
          </div>

          <!-- Body -->
          <div style="padding:20px 24px;background:#ffffff;">
            {CONTENT}
          </div>

          <!-- Footer -->
          <div style="padding:14px 24px 22px;background:#ffffff;border-top:1px solid #f6dede;text-align:center;font-size:12px;color:#777;">
            <div style="margin-bottom:8px;">
              <span style="font-weight:600;font-size:16px;color:#f16a85;font-family:'Great Vibes', 'Comic Sans MS', cursive;line-height:1.2;letter-spacing:0.5px;">Sending smiles with The Written Hug</span>
            </div>
          </div>

        </div>
      </div>

      ${createCommonFooter(images.footerImage)}

    </body>
    </html>
  `;
}