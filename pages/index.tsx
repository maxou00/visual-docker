import Head from "next/head";
import { DockerComposeProject } from "../src/docker-compose";
import { DockerComposeProvider } from "../src/docker-compose/providers/DockerComposeProvider";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Visual Docker</title>
        <meta
          name="description"
          content="Compose your IT infrastructure. With Docker. Visually"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DockerComposeProvider>
          <DockerComposeProject />
        </DockerComposeProvider>
      </main>
    </>
  );
}
