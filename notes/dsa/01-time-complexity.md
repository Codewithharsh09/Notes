# Time & Space Complexity — Quick Notes 
*(Based on Striver's A2Z DSA Course — Step 1.1)*

## 1. What is Time Complexity?

- **Time Complexity:** The time complexity of an algorithm quantifies the amount of time taken by an algorithm to run as a function of the length of the input. Note that the time to run is a function of the length of the input and not the actual execution time of the machine on which the algorithm is running on. The valid algorithm takes a finite amount of time for execution. **The time required by the algorithm to solve given problem is called time complexity  of the algorithm.** Time complexity is very useful measure in algorithm analysis. It is the time needed for the completion of an algorithm. To estimate the time complexity, we need to consider the cost of each fundamental instruction and the number of times the instruction is executed.

 - **Time complexity ≠ time taken:** The same code can take different real-world time on different machines (old laptop vs. new MacBook), so "seconds" is never a valid measure.
- **Definition:** the **rate at which time taken increases with respect to input size**.
- If you plot *input size* vs *time taken*, the slope of that line/curve is the time complexity — and that slope stays roughly the same across machines, even if the absolute time differs.

## 2. Big-O Notation

- Big-O, **O( )**, is how time complexity is expressed (never in seconds/minutes).
- Inside the brackets you write the **number of steps** the code takes as a function of input size `n`.
- Example: `for(i=0; i<5; i++) { print("Raj"); }` → 5 iterations × 3 operations (increment, compare, print) = 15 steps → **O(15)**.
- Change `5` to `n` → **O(3n)**.

### The 3 Golden Rules for computing Big-O
| Rule | Why |
|---|---|
| **1. Always use worst-case** | Systems must be built to handle the worst input, not the easiest one (build for 1 million users, not 1). |
| **2. Drop constants** | `O(3n)` → `O(n)`. Constants become insignificant as `n` grows large. |
| **3. Drop lower-order terms** | `4n³ + 3n² + 8` → `O(n³)`. For large `n`, smaller-degree terms contribute almost nothing. |

## 3. Best, Average, and Worst Case

Using a grading example (`if marks<25 → D`, `<45 → C`, `<65 → B`, `else → A`):
- **Best case** = minimum operations (input hits the *first* `if` and exits) → e.g., O(2).
- **Worst case** = maximum operations (input falls through *all* checks to `else`) → e.g., O(4).
- **Average case** = (best + worst) / 2 — essentially the median behavior.
- **Interviews always care about worst case.**

## 4. Big-O vs Big-Ω vs Big-Θ (good to know, rarely asked in interviews)

| Notation | Meaning |
|---|---|
| **O (Big-O)** | Upper bound → worst case |
| **Ω (Omega)** | Lower bound → best case |
| **Θ (Theta)** | Tight bound → average case |

> Interviews almost exclusively use **Big-O**. Formal limit-based derivations are academic/exam material, not interview material.

## 5. Working Out Time Complexity — Nested Loop Examples

**Example A — both loops run `0 to n`:**
```
for i in 0..n:
    for j in 0..n:
        O(1) work
```
→ Outer runs `n` times, inner runs `n` times each → **O(n²)**.

**Example B — inner loop depends on outer (`j` from `0` to `i`):**
```
for i in 0..n:
    for j in 0..i:
        O(1) work
```
→ Iterations: 1 + 2 + 3 + ... + n = `n(n+1)/2` = `n²/2 + n/2`
→ Drop constants & lower-order term → **O(n²)**.

## 6. Space Complexity

- **Definition:** Problem-solving using computer requires memory to hold temporary data or final result while the program is in execution. **The amount of memory required by the algorithm to solve given problem is called space complexity of the algorithm.** The space complexity of an algorithm quantifies the amount of space taken by an algorithm to run as a function of the length of the input. Consider an example: Suppose a problem to find the frequency of array elements. It is the amount of memory needed for the completion of an algorithm.To estimate the memory requirement we need to focus on two parts: 
    - **(1) A fixed part:** It is independent of the input size. It includes memory for instructions (code), constants, variables, etc.
    - **(2) A variable part:** It is dependent on the input size. It includes memory for recursion stack, referenced variables, etc.

- **Space Complexity = Auxiliary Space + Input Space**
  - **Input space:** memory used to store the given input.
  - **Auxiliary space:** *extra* memory your solution uses to solve the problem.
- Like time, it's also expressed in **Big-O**, not KB/MB.
- Example: declaring an array of size `n` → **O(n)** space.

### Golden Rule: Never modify the input
- It's tempting to reuse an input variable to save space (e.g., `b = a + b` instead of using a new variable `c`), but this is considered **bad practice** in interviews.
- Input data may be reused elsewhere in a real system — mutating it is risky.
- Using a *bit* more space (e.g., O(2n) instead of O(n)) to avoid touching input is totally acceptable.
- Only modify input if the interviewer explicitly says it's fine.

## 7. The "10⁸ operations per second" Rule (Competitive Programming)

- Most online judges/servers (LeetCode, GFG, CodeStudio, etc.) execute roughly **10⁸ operations per second**.
- Time limit of **1 second** → your solution's operation count should be ≈ **10⁸**.
- Time limit of **2 seconds** → ≈ **2 × 10⁸** operations (NOT 10¹⁶ — don't raise it to a power!).
- Time limit of **5 seconds** → ≈ **5 × 10⁸** operations.
- Use this to sanity-check whether your algorithm's Big-O will pass within the given constraints before you even submit.

---

# Interview Questions on Time & Space Complexity

### Conceptual

1. **Why isn't "time taken" a valid way to measure an algorithm's efficiency?**
   *Because execution time depends on hardware, OS, compiler, and system load — the same code runs at different speeds on different machines.*

2. **What is time complexity, formally?**
   *The rate at which the running time of an algorithm grows as a function of input size, expressed independent of hardware.*

3. **What is Big-O notation, and why do we use it over exact step counts?**
   *Big-O describes the upper bound / worst-case growth rate of an algorithm in terms of input size `n`, abstracting away machine-dependent constants and exact counts so algorithms can be compared fairly.*

4. **Differentiate between Big-O, Big-Ω, and Big-Θ.**
   *O = worst case (upper bound), Ω = best case (lower bound), Θ = average/tight bound.*

5. **Why do we always analyze worst-case complexity in interviews, rather than best or average case?**
   *Because real systems must be designed to handle the most demanding input reliably ("scale for a million users, not one").*

6. **Why do we drop constants and lower-order terms when computing Big-O?**
   *Because as `n` grows large, constants and smaller-degree terms become negligible relative to the dominant term — they don't change the growth trend.*

### Applied / Problem-Based

7. **What is the time complexity of two nested loops, both running from `0` to `n`?**
   *O(n²).*

8. **What is the time complexity if the inner loop runs from `0` to `i` (where `i` is the outer loop variable)?**
   *O(n²) — derived from the sum `1+2+...+n = n(n+1)/2`, simplified by dropping constants/lower terms.*

9. **If a server can execute ~10⁸ operations per second and the time limit is 2 seconds, roughly how many operations can your algorithm safely perform?**
   *About 2 × 10⁸ operations.*

10. **You're given `n = 10⁶` and a time limit of 1 second. Which time complexities would likely pass — O(n), O(n log n), O(n²), O(2ⁿ)?**
    *O(n) and O(n log n) would comfortably pass; O(n²) (≈10¹²) would almost certainly time out; O(2ⁿ) is completely infeasible.*

### Space Complexity

11. **What is the difference between auxiliary space and input space?**
    *Input space stores the given input; auxiliary space is the extra memory the algorithm uses beyond the input to solve the problem.*

12. **Why is it bad practice to overwrite/modify input variables to save space, even though it's technically more space-efficient?**
    *Input data can be referenced or reused elsewhere in a larger system; mutating it can introduce bugs or unintended side effects. Interviewers expect input to be treated as immutable unless told otherwise.*

13. **What is the space complexity of creating an array of size `n`?**
    *O(n).*

14. **Is O(2n) space considered acceptable compared to O(n)? Why might you choose it?**
    *Yes — constant multipliers are dropped in Big-O analysis, so O(2n) is still effectively O(n). You might use it deliberately to avoid mutating the original input.*

### Tricky/Follow-up Questions Interviewers Like to Ask

15. **If your algorithm's time complexity is O(n) but it has a huge constant factor (say 1000n), is it always faster than an O(n²) algorithm?**
    *Not necessarily for small/moderate `n` — Big-O only describes asymptotic growth as `n → ∞`. For small inputs, the constant-heavy O(n) can be slower than O(n²). (Good question to show you understand Big-O's limitations.)*

16. **Can an algorithm have different time complexities for best, average, and worst case? Give an example.**
    *Yes — e.g., Quicksort: O(n log n) average/best case, but O(n²) worst case (bad pivot choices).*

17. **Why doesn't Big-O notation account for actual hardware/machine speed?**
    *Because it measures the growth trend of operation count relative to input size, not wall-clock time — making it a hardware-independent way to compare algorithms.*
