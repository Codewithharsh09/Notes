---
title: Preemptive vs Non-Preemptive Scheduling
description: Detailed comparison of Preemptive and Non-Preemptive CPU scheduling, including advantages, disadvantages, and real-world examples.
---

# Preemptive and Non-Preemptive Scheduling

CPU scheduling can be broadly classified into two main types based on how the operating system handles the execution of processes: **Preemptive** and **Non-Preemptive**. Understanding these is fundamental to how modern operating systems manage multitasking.

---

## 🚀 Preemptive Scheduling
In preemptive scheduling, the operating system can interrupt a running process to allocate the CPU to another process. This is usually triggered by priority rules or time-sharing policies.

- **State Transition**: A process can be moved from the **Running** state to the **Ready** state before it finishes its execution.
- **Modern Use**: Almost all modern operating systems (Windows, Linux, macOS) use preemptive scheduling to ensure responsiveness.

### ✅ Advantages
- **No Monopolization**: Prevents a single process from hogging the CPU.
- **Responsiveness**: Better average response time in multi-user or interactive systems.
- **Urgency**: Allows high-priority tasks to be handled immediately.

### ❌ Disadvantages
- **Complexity**: Much harder to implement than non-preemptive scheduling.
- **Overhead**: Frequent context switching (saving/loading process states) consumes CPU cycles.
- **Starvation**: Low-priority processes may starve if high-priority processes arrive continuously.

**Examples**: Round Robin (RR), Shortest Remaining Time First (SRTF), Preemptive Priority.

---

## 🛑 Non-Preemptive Scheduling
In non-preemptive scheduling, once a process starts using the CPU, it holds it until it either finishes (terminates) or voluntarily moves to a waiting state (e.g., for I/O). The OS cannot forcibly take away the CPU.

- **State Transition**: A process moves from the **Running** state only when it is done or blocked.
- **Historical Use**: Used in older systems like Windows 3.11 and early macOS versions.

### ✅ Advantages
- **Simplicity**: Very easy to implement and manage.
- **Low Overhead**: Minimal scheduling burden as context switching only happens when a process finishes.
- **Predictability**: Less risk of concurrency issues during shared resource access.

### ❌ Disadvantages
- **Convoy Effect**: A long-running process can block all other processes, leading to high waiting times.
- **Low Responsiveness**: Average response time is poor, especially for short tasks stuck behind long ones.

**Examples**: First Come First Serve (FCFS), Shortest Job First (SJF), Non-Preemptive Priority.

---

## 📊 Comparison: Preemptive vs. Non-Preemptive

| Feature | Preemptive Scheduling | Non-Preemptive Scheduling |
| :--- | :--- | :--- |
| **Allocation** | CPU is allocated for a limited time (quantum). | CPU is held until termination or I/O. |
| **Interruption** | Process can be interrupted at any time. | Process cannot be interrupted. |
| **Starvation** | High-priority jobs can cause low-priority starvation. | Long-burst jobs can cause small-job starvation. |
| **Overhead** | High (due to frequent context switching). | Low (minimal scheduling overhead). |
| **Response Time** | Low (Fast response). | High (Slow response). |
| **Complexity** | More complex to design. | Simple and easy to implement. |
| **Decision** | Made by the Scheduler based on priority/time. | Made by the process itself. |

---

## 🎯 Interview Preparation: Key Differences
- **Critical Section**: In preemptive scheduling, if a process is interrupted while accessing shared data (critical section), it can lead to **race conditions**. This is why locking mechanisms (mutexes, semaphores) are vital in preemptive kernels.
- **Response Time**: If an interviewer asks which is better for a **Real-Time System**, the answer is usually **Preemptive**, as it allows critical tasks to preempt non-critical ones to meet deadlines.
