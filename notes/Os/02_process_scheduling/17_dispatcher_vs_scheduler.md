---
title: Dispatcher vs Scheduler
description: Detailed comparison between the Dispatcher and the Scheduler in Operating Systems, their roles, types, and how they work together.
---

# Dispatcher vs Scheduler in OS

In a multitasking operating system, many processes compete for CPU time. To manage this effectively, the OS uses two key components: the **Scheduler** and the **Dispatcher**. While they are interrelated, they perform distinct functions to ensure optimal CPU utilization.

---

## 🕒 Scheduler
A scheduler is a module that manages the execution of processes by deciding which one gets CPU time. It is responsible for selecting the process and determining the execution order.

### Types of Schedulers:
1.  **Long-Term (Job) Scheduler**: Loads processes from the job pool (secondary memory) into the ready queue (main memory).
2.  **Medium-Term Scheduler**: Handles swapping (suspending/resuming processes) based on system memory status.
3.  **Short-Term (CPU) Scheduler**: Frequently selects one process from the ready queue to execute next.

---

## 🏎️ Dispatcher
The Dispatcher takes over **after** the Short-Term Scheduler has selected a process. It is the module that actually gives control of the CPU to the chosen process.

### Functions of the Dispatcher:
- **Context Switching**: Saving the state of the old process and loading the state of the new one.
- **Mode Switching**: Moving from kernel mode to user mode.
- **Program Jumps**: Jumping to the correct starting location in the user program to restart it.

---

## 📊 Detailed Comparison: Scheduler vs. Dispatcher

| Feature | Scheduler | Dispatcher |
| :--- | :--- | :--- |
| **Primary Goal** | To select a process and determine execution order. | To start the execution of the selected process. |
| **Action** | Decides which process should be executed next. | Transfers control of the CPU to the selected process. |
| **Types** | Long-term, Medium-term, and Short-term. | No types; it’s a single module. |
| **Dependency** | Works independently. | Completely dependent on the scheduler’s decision. |
| **Algorithms** | Uses algorithms like FCFS, SJF, RR, etc. | Uses no specific algorithm. |
| **Frequency** | Less frequent, low decision overhead. | Very frequent, handles context switching overhead. |
| **Latency** | Takes longer than the dispatcher. | Executes in a very short time. |
| **Components** | Works with the ready queue. | Works with the CPU and the selected process. |

---

## 🎯 Interview Preparation: Key Differences
- **Dispatcher Latency**: The time it takes for the dispatcher to stop one process and start another is called **Dispatch Latency**. Modern OSs aim to minimize this.
- **Role Summary**: Think of the **Scheduler** as the *Manager* who decides who works next, and the **Dispatcher** as the *Foreman* who physically hands the tools to the worker.
