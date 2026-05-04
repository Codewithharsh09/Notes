---
title: Multilevel Queue Scheduling
description: Detailed explanation of Multilevel Queue (MLQ) CPU scheduling, including queue hierarchies, scheduling methods (Fixed Priority vs Time Slicing), and its pros and cons.
---

# Multilevel Queue (MLQ) CPU Scheduling

**Multilevel Queue (MLQ)** scheduling is an advanced scheduling method that partitions the ready queue into several separate queues based on process characteristics such as priority, memory requirements, or process type (e.g., System, Interactive, or Batch processes).

---

## 🏛️ How MLQ Works
- **Hierarchy**: Processes are divided into multiple queues arranged in a priority hierarchy.
- **Permanent Mapping**: Unlike Multilevel Feedback Queue, in MLQ, a process is **permanently assigned** to one queue and cannot move between them.
- **Independent Algorithms**: Each queue can use its own scheduling algorithm (e.g., Round Robin for interactive tasks and FCFS for batch tasks).

---

## 📂 Types of Queues (Example)
A typical system might divide processes into the following order of priority:
1.  **System Processes**: High-priority OS tasks.
2.  **Interactive Processes**: User-centric tasks requiring quick response (e.g., a text editor).
3.  **Batch Processes**: Background tasks that don't require user interaction.

---

## 🔄 Scheduling Between Queues
How does the OS decide which *queue* gets the CPU? There are two primary methods:

### 1. Fixed Priority Preemptive Scheduling
Each queue has absolute priority over lower-priority queues. 
- **Example**: Queue 1 > Queue 2 > Queue 3.
- No process in Queue 2 can run unless Queue 1 is empty. 
- If a process arrives in Queue 1 while Queue 2 is running, the process in Queue 2 is **preempted**.

### 2. Time Slicing
Each queue gets a specific portion of the CPU time to schedule its processes.
- **Example**: 
    - Queue 1 (System): 50% of CPU time.
    - Queue 2 (Interactive): 30% of CPU time.
    - Queue 3 (Batch): 20% of CPU time.
- This ensures that even low-priority queues get some CPU attention, preventing total starvation.

---

## ✅ Advantages
- **Organized**: Different types of processes are managed according to their specific needs.
- **Low Overhead**: Once a process is assigned to a queue, the system doesn't need to re-evaluate its placement.
- **Fast Response**: High-priority interactive tasks are served quickly.

## ❌ Disadvantages
- **Starvation**: In fixed-priority systems, low-priority queues might never run if high-priority queues are always busy.
- **Inflexible**: Processes cannot move between queues even if their behavior changes (e.g., an interactive task becomes a long batch task).
- **Complex Setup**: Requires careful configuration of queue priorities and time slices.

---

## 🎯 Interview Preparation: MLQ vs MLFQ
- **MLQ (Multilevel Queue)**: Processes are **static**. Once a process is in a queue, it stays there.
- **MLFQ (Multilevel Feedback Queue)**: Processes are **dynamic**. They can move between queues (e.g., if a process uses too much CPU, it's moved to a lower-priority queue).
