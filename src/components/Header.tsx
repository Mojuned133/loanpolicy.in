import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";

const NAV_LINKS = [
  { label: "Finance", href: "/category/Finance" },
  { label: "Bank Loan", href: "/category/Bank%20Loan" },
  { label: "Personal Loan", href: "/category/Personal%20Loan" },
  { label: "Credit Card", href: "/category/Credit%20Card" },
  { label: "New Loan App", href: "/category/New%20Loan%20App" },
];

export default function Header() {
  return <HeaderMenu />;
}