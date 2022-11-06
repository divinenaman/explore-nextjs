import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { Button, Form, Input, Typography, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function Home() {
  const router = useRouter();

  async function submitForm(data) {
    const f = new FormData();

    f.append("name", data.name);
    f.append("email", data.email);
    f.append("image", data.image.fileList[0]);

    const res = await fetch("/api/form", {
      method: "POST",
      body: f,
    });

    const resBody = await res.json();

    if (res.status == 200) {
      notification.success({
        duration: 3,
        message: "Submission Status",
        description: resBody.status,
        onClose: () => router.reload(window.location.pathname),
      });
    } else {
      notification.error({
        duration: 2,
        message: "Submission Status",
        description: resBody.status,
      });
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Form</title>
        <meta name="description" content="Form using Next API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography.Title level={3} style={{ paddingBottom: 30 }}>
          Form
        </Typography.Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={submitForm}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="image"
            name="image"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </main>

      <footer className={styles.footer}>
        created by:
        <a
          href="https://github.com/divinenaman"
          target="_blank"
          rel="noopener noreferrer"
        >
          @divinenaman
        </a>
      </footer>
    </div>
  );
}
