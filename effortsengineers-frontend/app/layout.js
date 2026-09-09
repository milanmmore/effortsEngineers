export const metadata = {
  title: 'Efforts Engineers',
  description: 'Client portal and administration platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}