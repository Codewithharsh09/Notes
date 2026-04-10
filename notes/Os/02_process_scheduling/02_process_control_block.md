
#  Process Control Block (PCB) in OS

*Last Updated : 29 Jan, 2026*

##  What is a Process Control Block?

A **Process Control Block (PCB)** is a critical data structure maintained by the Operating System for every active process. You can think of it as the "passport" or "ID card" for a process. It keeps track of all the information the OS needs to manage, monitor, and safely control the execution of that specific process.

Since a computer handles multiple processes at once (multitasking), the OS relies heavily on the PCB. During a state transition, the OS continuously updates the PCB with the latest execution data.

> 🔒 **Security Note**: The PCB contains highly sensitive execution data. Therefore, it is strictly stored in **kernel memory** (some operating systems place it at the start of the kernel stack for the process) so that standard user applications cannot access or modify it.

---

## 🗃️ Terminologies & Fields in a PCB

The PCB is essentially a complex structure containing several key pieces of information. Here are the most important fields:

1. **Process Number (PID)**: Every process is assigned a completely unique identifier known as its Process ID.
2. **Process State**: Stores the current condition of the process. Is it *running*, *waiting*, *ready*, or *terminated*?
3. **Program Counter (PC)**: This stores the precise memory address of the ***next*** instruction that needs to be executed for this process.
4. **CPU Registers**: This is crucial. When a process runs out of execution time (its time slice expires), the current values of all CPU-specific registers are saved directly into the PCB before the process gets swapped out. When the OS schedules the process to run again, these saved register values are read from the PCB and written back to the CPU so the process can effortlessly resume.
5. **Memory Limits**: Contains information about the memory management system. It points to the **page tables** or **segment tables**, detailing exactly which blocks of memory belong to the process.
6. **List of Open Files (I/O Status)**: A list of all files, network connections, and I/O devices currently opened and used by the process.
7. **Scheduling Info**: Includes details like CPU quantum (time slice allowance) and the process priority.

> **Note on Process Table**: The Operating System maintains an array (or sometimes a linked list) of all these PCBs known as the **Process Table**. This table holds the information for all active processes globally spanning the system.

---

## 🚀 Applications & Why PCBs are Important

The Operating System wouldn't function without PCBs. They are vital for several core operations:

- **Process Scheduling**: Tracks process states and CPU priority to determine *which* process should execute next to allocate CPU resources efficiently.
- **Context Switching**: Supports seamless switching between processes by safely storing CPU registers and stack pointer information over time.
- **Resource Management**: Facilitates safe resource utilization and sharing by keeping detailed resource-usage statistics for system accounting.
- **Process Synchronization**: Assists in process synchronization by keeping strict track of which processes are in waiting states and which exact resources they are waiting for.

---

## 🎯 Interview Preparation: Key Takeaways & Questions

Prepare for OS internals questions by mastering the concept of the PCB.

### 💡 Top Interview Questions & Tips

1. **What exactly is a Context Switch, and how is the PCB involved?**
   - *Answer*: A context switch is the process of stopping one process and starting another. The OS uses the PCB to **save the context** (state, registers, program counter) of the currently running process, and then **loads the context** from the PCB of the new process it wants to schedule. 
   - *Tip*: Always emphasize that context switching introduces *overhead* (wasted CPU time) because the CPU does no useful application work while it is busy saving and loading PCBs.

2. **Why is the PCB specifically stored in Kernel Space?**
   - *Answer*: If the PCB were stored in user space memory, a malicious or buggy program could alter its own priority level, change its memory limits, or access other processes' private data. Keeping it in kernel space ensures **security, isolation, and stability**.

3. **What is the Program Counter (PC) in the PCB?**
   - *Answer*: The PC keeps track of the memory address of the very *next* instruction to be executed.

4. **Is there a physical limit on the number of processes an OS can run at once?**
   - *Answer*: Yes, and it's constrained by the maximum size of the **Process Table** (the array of PCBs) as well as the available system RAM needed to store those PCBs.

> 🏆 **Pro Tip for Interviews**: When explaining PCBs, use the term **"Illusion of Continuity"**. Because the PCB so perfectly saves the state of the registers and memory bounds, a process remains fully ignorant that it was ever paused! As far as a process is concerned, it ran continuously.