/**
 * Interface for mail environment variables
 */
export interface Mail {
  email: string;
  password: string;
  host: string; // Default: smtp.gmail.com
  port: number; // Default: 465
}

/**
 * Fetch the environment variables for sending an email
 * @returns {Mail} Mail environment variables
 */
export function fetchMailVariables(): Mail {
  const email = process.env.EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = process.env.EMAIL_PORT || 465;

  if (!email || !password) {
    console.error("Please set EMAIL and EMAIL_PASSWORD environment variables");
    process.exit(1);
  }

  return { email, password, host, port } as Mail;
}
