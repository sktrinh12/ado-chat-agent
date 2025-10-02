import React, { FC } from "react";
import type { UrlItem } from "../types/api";

interface UrlListProps {
  urls: UrlItem[];
}

const truncate = (text: string, maxLength = 60) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const UrlList: FC<UrlListProps> = ({ urls }) => {
  return (
    <ul>
      {urls.map((u) => (
        <li key={u.id}>
          <a href={u.url} target="_blank" rel="noopener noreferrer">
            <strong>{u.id}</strong>: {truncate(u.title)}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UrlList;
