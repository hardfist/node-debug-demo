# Python 3: Fibonacci series up to n
def fib(n):
    a, b = 0, 1
    while a < n:
        print a
        a, b = b, a+b
    print()
i = 0;
while True:
  i = i + 1
  fib(i)