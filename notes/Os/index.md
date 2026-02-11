# Operating System Syllabus & Important Topics

These notes provide an overview of the Operating System syllabus, highlighting mandatory topics for GATE and UGC NET exams using "Smart Work" principles.

## 📌 Syllabus Overview (Quick Links)

| Topic | Importance | Key Concepts |
| :--- | :--- | :--- |
| [Basic Introduction](#basic-introduction) | ⭐ Overview | OS Types, **Process Diagram**, **System Calls** |
| ↳ *[Process Diagram](#process-diagram)* | ⭐⭐ Important | Process Stages/States (New, Ready, Running, etc.) |
| ↳ *[System Calls](#system-calls)* | ⭐ Important | Fork(), Kernel vs User mode, File system calls |
| [Process Scheduling](#process-scheduling) | ⭐⭐⭐ **Mandatory** | FIFO, SJF, Round Robin, Pre-emptive scheduling |
| [Process Synchronization](#process-synchronization) | ⭐⭐⭐ **Mandatory** | Semaphores (Binary), Peterson's Solution |
| [Deadlock & Threads](#deadlock-and-threads) | ⭐⭐ Easy Marks | Banker's Algorithm, Prevention, Avoidance, User vs Kernel Threads |
| [Memory Management](#memory-management) | ⭐⭐⭐ **Mandatory** | Paging, Segmentation, **Virtual Memory** |
| ↳ *[Virtual Memory](#virtual-memory)* | ⭐⭐⭐ **Mandatory** | Thrashing, Page Replacement (FIFO, LRU, Optimal) |
| [Disk Scheduling](#disk-scheduling) | ⭐⭐⭐ **Mandatory** | SCAN, C-SCAN, FCFS (Very easy & scoring) |
| [UNIX/Linux Commands](#unix-linux-commands) | ⭐ Important (NET) | LS, MKDIR, CD, CHMOD system calls |
| [File Management & Security](#file-management-and-security) | ⭐ Overview | Sequential/Random Access, Viruses, Vulnerabilities |

---

## Basic Introduction
- **Definition:** An Operating System(OS) is a software that manages and handles hardware and software resources of a computing device. Interface between user and hardware.

  - Manages computer resources such as CPU, memory, and files
  - Acts as an interface between user and hardware
  - Performs core functions like process, memory, and file management
  - Organizes system resources similar to different departments in a government
  - Examples include Linux, Unix, Windows 11, MS-DOS, Android, macOS, and iOS

- **Types of OS:**
  - **Batch OS:** Similar jobs are batched together.
  - **Multiprogramming:** Multiple programs in main memory.
  - **Multitasking/Time Sharing:** Extension of multiprogramming with CPU switching.
  - **Real-time OS:** Strict time constraints (Hard/Soft).

### 🛠️ Process Diagram {#process-diagram}
- **Definition:** The stages a process passes through during execution.
- **Stages of a Process:** New → Ready → Running → Waiting → Terminated.
- **Process Control Block (PCB):** A data structure used by the OS to store all the information about a process.
- **Importance:** Crucial for understanding CPU execution and scheduling.

### 📞 System Calls {#system-calls}
- **Definition:** A programmatic way for a computer program to request a service from the kernel of the operating system.
- **Key Examples:**
  - **Fork():** Used to create a new (child) process.
  - **File Management:** `open()`, `read()`, `write()`, `close()`.
  - **Device Management**, **Information Maintenance**, **Communication**.
- **Modes:** Understanding the transition between **User Mode** and **Kernel Mode**.

## Process Scheduling
> **Mandatory Topic:** Every year, questions appear in GATE/UGC NET.
- **Algorithms:**
  - **First-In-First-Out (FIFO)**
  - **Shortest Job First (SJF)**
  - **Pre-emptive Scheduling:** (e.g., Shortest Remaining Time First)
  - **Round Robin:** Uses time quanta for fair allocation.
- **Tip:** Practice 1-2 numericals for each to secure marks.

## Process Synchronization
- **Semaphores:** Focus especially on **Binary Semaphores**.
- **Peterson's Solution:** A classic software-based solution for synchronization.
- **Complexity:** This topic can be tricky, but understanding Semaphores is crucial.

## Deadlock and Threads
- **Deadlock:**
  - **Prevention & Avoidance:** Strategies to handle deadlocks.
  - **Banker's Algorithm:** Mandatory numerical portion. Very easy to solve if practiced.
- **Threads:**
  - **Types:** Difference between **User-level threads** and **Kernel-level threads**.

## Memory Management
- **Key Concepts:**
  - **Paging:** Fixed-size blocks.
  - **Segmentation:** Variable-size segments.
  - **Fragmentation:** Internal vs External fragmentation.
- **Advanced Concepts:** Multi-level paging and Segmented paging.

### 🧠 Virtual Memory {#virtual-memory}
- **Definition:** A memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine".
- **Effective Memory Access Time:** Numerical questions based on page faults and access time.
- **Thrashing:** A state where the system spends more time paging than executing processes.
- **Page Replacement Algorithms:** 
  - ⭐ **FIFO, LRU, Optimal.**
  - **Note:** Every year questions are asked from this topic. Practice 2-3 numericals.

## Disk Scheduling
- **Numerical portion:** Find the total head movement.
- **Algorithms:**
  - **FCFS**
  - **SCAN**
  - **C-SCAN**
  - **LOOK/C-LOOK**
- **Tip:** Practice 1-2 questions to ensure correctness.

## UNIX/Linux Commands
- **Important for UGC NET:**
  - `ls`, `mkdir`, `cd`, `chmod`.
  - Recently asked: `chmod` command (July 2018).
- **System Calls:** Open system call and its parameters.

## File Management and Security
- **File Access Methods:** Sequential, Random, and Linked access.
- **Allocation Methods:** Understanding complexities (Time/Space).
- **Security:**
  - Definitions of Virus, Vulnerabilities, and Loopholes.
  - Types of Attacks.
  - Encryption basics (overlaps with Cryptography).

---
**Link:** [Reference Link for OS](https://www.youtube.com/watch?v=bkSWJJZNgf8&list=PLc5rXIqickU2_VgSS5fwa0Di4V7vsaOlr&index=2)
