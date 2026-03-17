# Fork System Call

The **fork** system call is used to create a **child process** from an existing process (the parent). The child is an almost exact clone of the parent — it has its own Process ID (PID), its own registers, and its own memory space, but it starts by copying the parent's state at the moment `fork()` was called.

> **Fork** = "split" — one process becomes two. Both continue execution from the line after `fork()`.

---

## 🔑 What is fork()?

`fork()` is a **process control system call** (available on Unix, Linux, macOS) that:

- Creates a **child process** that is a clone of the calling process (the parent).
- Returns **different values** to the parent and the child so each can tell who it is.
- Allows the parent and child to run **concurrently** (in parallel).

```mermaid
graph TD
    P["Parent Process (main program)"]
    Fork["fork() called"]
    P2["Parent continues\n(returns positive / child's PID)"]
    C["Child created\n(returns 0)"]

    P --> Fork
    Fork --> P2
    Fork --> C

    classDef green fill:white,stroke:#2E8B57,stroke-width:2px;
    classDef greenCircle fill:#2E8B57,stroke:#2E8B57,color:white;
    class P,P2,C green;
    class Fork greenCircle;
```

---

## 📤 Return Values of fork()

`fork()` returns **three possible values** — but in most exam questions, we only care about two:

| Return Value | Meaning | Who Receives It |
| :--- | :--- | :--- |
| **0** | Child process | The newly created child |
| **Positive** (e.g., child's PID) | Parent process | The original process (parent) |
| **-1** | Error — child not created | Parent (e.g., kernel busy, resource limit) |

> In typical questions, we assume the child is created successfully, so we only use **0** (child) and **positive** (parent).

---

## 🧬 Fork vs Thread — Quick Comparison

| Aspect | Fork | Thread |
| :--- | :--- | :--- |
| **What is created** | A new process (full clone) | A lightweight unit within the same process |
| **Process ID** | Child has its own PID | Shares the same PID as the parent process |
| **Memory** | Separate address space (copy-on-write) | Shared address space |
| **Analogy** | Creating a full clone of yourself | Adding an extra "hand" — most things shared, one extra thing doing work |
| **Overhead** | Higher (new process, new PCB) | Lower (shared resources) |

---

## 📝 Basic Example — One fork()

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    printf("Hello\n");   // Without fork: prints once
    fork();              // Child created here — both continue from next line
    printf("Hello\n");   // Prints TWICE (parent + child)
    return 0;
}
```

**Output:** `Hello` is printed **2 times**.

- **Without fork:** Only the parent runs → 1 print.
- **With fork:** Parent and child both run the code after `fork()` → 2 prints.

```mermaid
flowchart TD
    Start["main() starts"]
    P1["printf Hello — 1st time"]
    F["fork()"]
    P["Parent"]
    C["Child"]
    P2["printf Hello — 2nd time"]
    C2["printf Hello — 2nd time"]

    Start --> P1 --> F
    F --> P
    F --> C
    P --> P2
    C --> C2

    classDef green fill:white,stroke:#2E8B57,stroke-width:2px;
    class P1,F,P,C,P2,C2 green;
```

---

## 📝 Two fork() Calls

```c
int main() {
    fork();   // First fork: P creates C1
    fork();   // Second fork: P creates C3, C1 creates C2
    printf("Hello\n");
    return 0;
}
```

**What happens:**

1. **First fork:** Parent (P) creates child C1. Now we have **P** and **C1**.
2. **Second fork:** 
   - **P** creates another child → **C3**
   - **C1** (which also runs the second fork) creates its own child → **C2**

**Total processes:** P, C1, C2, C3 → **4 processes**  
**Output:** `Hello` is printed **4 times**.

```mermaid
flowchart TD
    P["P (Parent)"]
    F1["fork() #1"]
    P2["P"]
    C1["C1"]
    F2["fork() #2"]
    P3["P"]
    C3["C3"]
    C1_2["C1"]
    C2["C2"]
    Print["printf Hello"]

    P --> F1
    F1 --> P2
    F1 --> C1
    P2 --> F2
    F2 --> P3
    F2 --> C3
    C1 --> C1_2
    C1_2 --> C2
    P3 --> Print
    C3 --> Print
    C1_2 --> Print
    C2 --> Print

    classDef green fill:white,stroke:#2E8B57,stroke-width:2px;
    class P,F1,F2,P2,C1,P3,C3,C1_2,C2,Print green;
```

---

## 📝 Three fork() Calls

```c
int main() {
    fork();
    fork();
    fork();
    printf("Hello\n");
    return 0;
}
```

**Process tree:**

| After | Processes |
| :--- | :--- |
| 1st fork | P, C1 |
| 2nd fork | P, C1, C2, C3 |
| 3rd fork | P, C1, C2, C3, C4, C5, C6, C7 |

**Total processes:** **8** (1 parent + 7 children)  
**Output:** `Hello` is printed **8 times**.

```mermaid
flowchart TD
    P["P"]
    F1["fork()"]
    P1["P"] --> F2["fork()"]
    C1["C1"] --> F2b["fork()"]
    F2 --> P2["P"]
    F2 --> C3["C3"]
    F2b --> C1b["C1"]
    F2b --> C2["C2"]
    F3["fork()"]
    F3b["fork()"]
    F3c["fork()"]
    F3d["fork()"]
    P2 --> F3
    C3 --> F3b
    C1b --> F3c
    C2 --> F3d

    F3 --> P3["P"]
    F3 --> C7["C7"]
    F3b --> C3b["C3"]
    F3b --> C6["C6"]
    F3c --> C1c["C1"]
    F3c --> C5["C5"]
    F3d --> C2b["C2"]
    F3d --> C4["C4"]

    classDef green fill:white,stroke:#2E8B57,stroke-width:2px;
```

---

## 📐 Important Formulas (GATE / UGC NET)

These formulas are frequently asked in competitive exams:

| Question | Formula |
| :--- | :--- |
| **How many times does the code run?** (total executions) | **2<sup>n</sup>** |
| **How many child processes are created?** | **2<sup>n</sup> − 1** |

Where **n** = number of times `fork()` is called.

### Examples

| n (forks) | Total processes | Child processes | Total executions |
| :--- | :--- | :--- | :--- |
| 1 | 2 | 1 | 2 |
| 2 | 4 | 3 | 4 |
| 3 | 8 | 7 | 8 |
| 4 | 16 | 15 | 16 |

### Why 2<sup>n</sup>?

Each `fork()` doubles the number of processes. Every process that reaches the next `fork()` will create one more child.

| Forks | Processes |
| :--- | :--- |
| 0 | 1 |
| 1 | 2 = 2<sup>1</sup> |
| 2 | 4 = 2<sup>2</sup> |
| 3 | 8 = 2<sup>3</sup> |
| n | 2<sup>n</sup> |

---

## 🔢 Using Return Value to Distinguish Parent and Child

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        printf("I am the CHILD (PID: %d)\n", getpid());
    } else if (pid > 0) {
        printf("I am the PARENT (child's PID: %d)\n", pid);
    } else {
        printf("Child creation failed (error)\n");
    }

    return 0;
}
```

- **Child:** `pid == 0`
- **Parent:** `pid > 0` (the value is the child's PID)
- **Error:** `pid == -1` (rare in practice; usually assumed not to occur in exam questions)

---

## 🔑 Key Takeaways

- **fork()** creates a child process that is a clone of the parent.
- **Return value:** 0 = child, positive = parent (child's PID), -1 = error.
- **Total processes** after n forks = **2<sup>n</sup>**.
- **Total child processes** = **2<sup>n</sup> − 1** (parent is not a child).
- Parent and child run **concurrently** from the line after `fork()`.
- Fork is a **frequently asked topic** in GATE, UGC NET, and other CS competitive exams.

---

### 📚 References
- *Gate Smashers* - [Fork System Call](https://youtu.be/ixq5cpdEO2Q?si=2GKnLP7s9uiFaBU4)
- *GeeksforGeeks* - [fork() in C](https://www.geeksforgeeks.org/fork-system-call/)
- *man fork(2)* - Linux/Unix manual
