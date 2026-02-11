# Introduction to Operating System & Functionalities

Operating System (OS) is a **System Software** that acts as an interface between the user and the computer hardware.

## 🖥️ The OS as an Interface
The OS provides a layer of interaction between the **User** and the **Hardware** (CPU, RAM, HDD, I/O devices).

### What if there was no OS?
- **Complexity**: Users would have to write specific programs for every hardware interaction (e.g., a separate program just to use a printer).
- **No Authority**: No central manager to allocate or take back resources from users.
- **Redundancy**: Repeating the same hardware-access code across different applications.

---

## 🎯 Primary Goals of an OS

| Goal | Description | Primary Example |
| :--- | :--- | :--- |
| **Convenience** | Making the system easiest to use for the user. | **Windows** (Focuses on GUI and ease of use) |
| **Throughput** | Maximizing the number of tasks executed per unit time (Efficiency). | **Linux** (Highly efficient for servers and complex tasks) |

*Note: Modern systems like macOS attempt to balance both.*

---

## ⚙️ Key Functionalities of OS

### 1. Resource Manager / Governor
- Manages hardware like CPU and RAM.
- Useful in **Parallel Processing** where multiple users/requests access the same hardware.
- Decides how much resource to provide to which user and for how long.

### 2. Process Management
- Manages the execution of multiple processes (Multitasking).
- **CPU Scheduling**: Uses algorithms to decide which process gets the CPU brain time.
- Handles the state of processes (New, Ready, Running, etc.).

### 3. Storage Management
- Manages permanent data in secondary storage (Hard Disk).
- Uses **File Systems** (NTFS, NFS, CIFS) to organize data into tracks and sectors.

### 4. Memory Management (RAM)
- RAM is limited; OS handles **Allocation & Deallocation**.
- **Swapping**: Moving processes in and out of RAM to allow multiple programs to run.

### 5. Security and Privacy
- **Authentication**: Password protection and Kerberos protocols.
- **Process Isolation**: Ensures one process (e.g., P1) cannot interfere with the memory space of another (e.g., P2).

---

## ⌨️ How Users Interact with OS
Users don't usually "see" the OS working. Interaction happens through:
1. **Application Level**: Using GUI (e.g., Ctrl+P for printing).
2. **Shell / Terminal**: Using commands (Command Prompt in Windows, Terminal in Linux).

### System Calls
The OS performs every task using **System Calls**.
- **open()**: To open a file.
- **read() / write()**: To access data.
- **fork()**: To create a new process.
- **print()**: Invokes a hardware system call for the printer.

---
*Reference: Gate Smashers - [Introduction to operating system and its functionalities](https://www.youtube.com/watch?v=WJ-UaAaumNA&list=PLc5rXIqickU2_VgSS5fwa0Di4V7vsaOlr&index=2)
