import Link from "next/link";
import css from "./SideBar.module.css";
const Tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
function SideBar() {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/All`}
          className={css.menuLink}
          // onClick={() => setIsOpen(false)}
        >
          All
        </Link>
      </li>
      {Tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
            // onClick={() => setIsOpen(false)}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SideBar;
