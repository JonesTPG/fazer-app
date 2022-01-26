import React, { useEffect, useState } from "react";

type Props = {};

const TodoPage = (props: Props) => {
  const [ip, setIp] = useState<string | null>(null);
  useEffect(() => {
    const getIp = async (): Promise<{ ip?: string }> => {
      const res = await fetch("/api/todosByIp");
      if (res.status === 400) {
        return {};
      }
      return await res.json();
    };
    getIp().then(({ ip: newIp = null }) => setIp(newIp));
  }, []);

  return <div>{!!ip ? ip : "NULL"}</div>;
};

export default TodoPage;
