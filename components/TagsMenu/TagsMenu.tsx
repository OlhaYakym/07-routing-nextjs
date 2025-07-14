"use client";
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";
const Tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.menuContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All
            </Link>
          </li>
          {Tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TagsMenu;
