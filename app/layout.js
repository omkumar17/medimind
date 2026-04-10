import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'MediMind',
  description: 'Smart Health Assistant for daily care',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
