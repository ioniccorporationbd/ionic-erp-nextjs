"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiEdit2,
  FiGithub,
  FiMenu,
  FiMoon,
  FiMoreHorizontal,
  FiSearch,
  FiX,
} from "react-icons/fi";
import styles from "./tutorial.module.css";
import {
  tutorialNavigationGroups,
  tutorialSlug,
  type TutorialTopic,
} from "@/content/tutorial-navigation";

const articleSections = [
  { id: "why-frappe-hr", label: "Why Frappe HR", nested: false },
  { id: "key-features", label: "Key Features", nested: false },
  { id: "under-the-hood", label: "Under the Hood", nested: false },
  { id: "installation", label: "Installation", nested: false },
  { id: "learning-and-community", label: "Learning and Community", nested: true },
] as const;

function DocumentationNavigation({ onNavigate, activeTopic }: Readonly<{ onNavigate?: () => void; activeTopic?: TutorialTopic }>) {
  const [openGroup, setOpenGroup] = useState(activeTopic?.group ?? "Introduction");

  return (
    <nav className={styles.navigation} aria-label="Documentation navigation">
      {tutorialNavigationGroups.map((group) => {
        const isOpen = openGroup === group.title;
        return (
          <div key={group.title} className={styles.navGroup}>
            <button
              type="button"
              className={styles.navGroupButton}
              aria-expanded={isOpen}
              onClick={() => setOpenGroup(isOpen ? "" : group.title)}
            >
              {isOpen ? <FiChevronDown aria-hidden /> : <FiChevronRight aria-hidden />}
              <span>{group.title}</span>
            </button>
            {isOpen && group.links ? (
              <div className={styles.navLinks}>
                {group.links.map((link) => {
                  const slug = tutorialSlug(group.title, link);
                  const isActive = activeTopic?.slug === slug || (!activeTopic && group.title === "Introduction" && link === "Frappe HR");
                  return (
                  <Link
                    className={isActive ? styles.activeNavLink : styles.navLink}
                    href={group.title === "Introduction" && link === "Frappe HR" ? "/tutorial" : `/tutorial/${slug}`}
                    key={link}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    data-tutorial-link={slug}
                  >
                    {link}
                  </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export default function TutorialPage({ topic }: Readonly<{ topic?: TutorialTopic }>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <div className={`tutorial-page ${styles.page}`}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/tutorial" aria-label="Frappe HR tutorial home">
          <Image src="/assets/tutorial/frappe-hr-logo.png" width={24} height={24} alt="" />
          <span>Frappe HR</span>
          <FiChevronDown className={styles.brandChevron} aria-hidden />
        </Link>

        <button type="button" className={styles.desktopSearch} aria-label="Open search">
          <FiSearch aria-hidden />
          <span>Search documentation</span>
          <kbd>Ctrl K</kbd>
        </button>

        <nav className={styles.topLinks} aria-label="Community links">
          <a href="https://school.frappe.io/lms/courses">Learn</a>
          <a href="https://discuss.frappe.io/c/hr/22">Discuss</a>
          <a href="https://frappe.io/hr">Website</a>
          <a className={styles.iconLink} href="https://github.com/frappe/hrms" aria-label="Github"><FiGithub /></a>
          <button className={styles.iconButton} type="button" aria-label="Toggle theme"><FiMoon /></button>
          <button className={styles.mobileSearch} type="button" aria-label="Open search"><FiSearch /></button>
          <button className={styles.mobileMenuButton} type="button" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}><FiMenu /></button>
        </nav>
      </header>

      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <DocumentationNavigation activeTopic={topic} />
        </aside>

        <main className={styles.main}>
          <article className={styles.article}>
            <div className={styles.articleToolbar}>
              <h1 id="page-title">{topic?.title ?? "Frappe HR"}</h1>
              <div className={styles.pageActions}>
                <button type="button"><FiEdit2 aria-hidden /><span>Edit</span></button>
                <button type="button" aria-label="More page actions"><FiChevronDown aria-hidden /></button>
              </div>
            </div>
            <div className={styles.rule} />

            <p>{topic ? `${topic.title} is an individual tutorial in the ${topic.group} section of Frappe HR. Use this page to understand the feature, its place in the HR workflow, and the related configuration available from the documentation menu.` : "Frappe HR is an open Source, modern, and easy-to-use HR and Payroll Software for all organizations. It has everything you need to drive excellence within the company. It is a complete HRMS solution with over 13 different modules right from Employee Management, Onboarding, Leaves, to Payroll, Taxation, and more!"}</p>

            <Image
              className={styles.heroImage}
              src="/assets/tutorial/employee-dashboard.png"
              width={1024}
              height={576}
              sizes="(max-width: 768px) calc(100vw - 32px), 614px"
              alt="Frappe HR employee dashboard"
              priority
            />

            <section id="why-frappe-hr">
              <h2><a href="#why-frappe-hr" aria-label="Link to Why Frappe HR">#</a>Why Frappe HR</h2>
              <p>Businesses often struggle with scattered HR processes, manual payroll calculations, disconnected employee records, and time-consuming approvals.</p>
              <ul>
                <li>Frappe HR brings everything under one roof so HR teams can focus on people, not paperwork.</li>
                <li>Built for organizations that need a flexible and cost-effective solution, Frappe HR eliminates inefficiencies, ensures compliance, and gives employees a seamless experience.</li>
                <li>Whether you are managing a handful of employees or scaling to thousands, it helps you stay organized without getting bogged down in administrative overhead.</li>
              </ul>
            </section>

            <section id="key-features">
              <h2><a href="#key-features" aria-label="Link to Key Features">#</a>Key Features</h2>
              <ul>
                <li><strong>Employee Lifecycle:</strong> From onboarding employees, managing promotions and transfers, all the way to documenting feedback with exit interviews, make life easier for employees throughout their life cycle.</li>
                <li><strong>Leave and Attendance:</strong> Configure leave policies, pull regional holidays with a click, check-in and check-out with geolocation capturing, track leave balances and attendance with reports.</li>
                <li><strong>Expense Claims and Advances:</strong> Manage employee advances, claim expenses, configure multi-level approval workflows, all this with seamless integration with ERPNext accounting.</li>
                <li><strong>Performance Management:</strong> Track goals, align goals with key result areas (KRAs), enable employees to evaluate themselves, make managing appraisal cycles easy.</li>
                <li><strong>Payroll &amp; Taxation:</strong> Create salary structures, configure income tax slabs, run standard payroll, accommodate additional salaries and off cycle payments, view income breakup on salary slips and so much more.</li>
                <li><strong>Frappe HR Mobile App:</strong> Apply for and approve leaves on the go, check-in and check-out, access employee profile right from the mobile app.</li>
              </ul>
              <p>And more.</p>
            </section>

            <section id="under-the-hood">
              <h2><a href="#under-the-hood" aria-label="Link to Under the Hood">#</a>Under the Hood</h2>
              <ul>
                <li><strong><a href="https://github.com/frappe/frappe">Frappe Framework</a>:</strong> A full-stack web application framework written in Python and Javascript. The framework provides a robust foundation for building web applications, including a database abstraction layer, user authentication, and a REST API.</li>
                <li><strong><a href="https://github.com/frappe/frappe-ui">Frappe UI</a>:</strong> A Vue-based UI library, to provide a modern user interface. The Frappe UI library provides a variety of components that can be used to build single-page applications on top of the Frappe Framework.</li>
              </ul>
            </section>

            <section id="installation">
              <h2><a href="#installation" aria-label="Link to Installation">#</a>Installation</h2>
              <p>To install/setup the app, follow the <a href="https://github.com/frappe/hrms/?tab=readme-ov-file#production-setup">guidelines here</a>.</p>
              <h3 id="learning-and-community"><a href="#learning-and-community" aria-label="Link to Learning and Community">#</a>Learning and Community</h3>
              <ol>
                <li><a href="https://frappe.school">Frappe School</a> - Learn Frappe Framework and ERPNext from the various courses by the maintainers or from the community.</li>
                <li><a href="https://docs.frappe.io/hr">Documentation</a> - Extensive documentation for Frappe HR.</li>
                <li><a href="https://discuss.erpnext.com/">User Forum</a> - Engage with the community of ERPNext users and service providers.</li>
                <li><a href="https://t.me/frappehr">Telegram Group</a> - Get instant help from the community of users.</li>
              </ol>
            </section>

            <a className={styles.nextPage} href="#">
              <span>Next</span>
              <strong>Videos</strong>
              <FiChevronRight aria-hidden />
            </a>
            <p className={styles.updated}>Last updated 6 months ago</p>
            <div className={styles.feedback}>
              <span>Was this helpful?</span>
              <div><button type="button" aria-label="Bad">☹</button><button type="button" aria-label="Ok">●</button><button type="button" aria-label="Good">☺</button></div>
            </div>
          </article>
        </main>

        <aside className={styles.onThisPage}>
          <div className={styles.stickyContents}>
            <strong>On this page</strong>
            {articleSections.map((section) => (
              <a className={section.nested ? styles.nestedContentLink : undefined} href={`#${section.id}`} key={section.id}>{section.label}</a>
            ))}
          </div>
        </aside>
      </div>

      {mobileMenuOpen ? (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true" aria-label="Documentation menu">
          <button className={styles.drawerBackdrop} type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
          <aside className={styles.drawerPanel}>
            <div className={styles.drawerHeader}><strong>Menu</strong><button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}><FiX /></button></div>
            <DocumentationNavigation activeTopic={topic} onNavigate={() => setMobileMenuOpen(false)} />
          </aside>
        </div>
      ) : null}

      <button className={styles.floatingMenu} type="button" onClick={() => setMobileMenuOpen(true)}><FiMenu aria-hidden /> Menu</button>
      <button className={styles.floatingMore} type="button" aria-label="More page actions"><FiMoreHorizontal /></button>
    </div>
  );
}
