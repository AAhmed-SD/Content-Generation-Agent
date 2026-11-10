---
level: A-level
subject: Computer Science
topic: "Object-oriented programming"
as_content: "A-level only for AQA (not in 7516) and OCR. Eduqas does not split AS content in its A-level specification."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.1.2.3"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.2.4(e)", "2.2.1(f)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C1.4: Programming paradigms"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Object-oriented programming

This file covers classes, objects, instantiation and constructors, encapsulation and access specifiers, inheritance, polymorphism and overriding, aggregation and composition, abstract, virtual and static methods, class diagrams, and three OO design principles. There is no GCSE equivalent: OOP is new at A-level.

The whole of this file is one AQA spec point, so it is split into parts by idea.

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Core ideas | Class, object, instantiation, encapsulation, inheritance, aggregation, composition, polymorphism, overriding | Classes, objects, methods, attributes, inheritance, encapsulation, polymorphism | Object, class and method, and the role of the OO approach |
| Methods | Abstract, virtual, static; public, private, protected | Not named beyond methods | Not named |
| Diagrams | Class diagrams with +, −, #, inheritance arrows, black and white diamonds | Not required | Not required |
| Design principles | Encapsulate what varies; favour composition over inheritance; program to interfaces | Not named | Not named |
| Code in exam | Write OO code on screen (Paper 1) | Read and write OCR-style pseudo-code classes | Describe |

OCR's exam pseudo-code uses `class Pet`, `private name`, `public procedure new(...)` (the constructor), `inherits`, and `super.new(...)`.

## Classes, objects and instantiation

*Refs: AQA 4.1.2.3 · OCR 1.2.4(e), 2.2.1(f) · Eduqas C1.4: Programming paradigms.*

### What you need to know

- A class is a blueprint (template) that defines the attributes (properties, fields: the data) and methods (the procedures and functions) that all objects of that type will have.
- An object is an instance of a class: a particular thing with its own values for the attributes.
- Instantiation is creating an object from a class. A constructor is the special method that runs when an object is created, usually to set the initial attribute values. It can be explicit (written by you) or implicit (provided by the language). A reference to the new object is stored in a variable of the class type.
- A method is a subroutine that belongs to a class and works on an object's attributes.
- Why OO is used: it models real-world things naturally; code is organised into self-contained, reusable classes; encapsulation protects data; inheritance reduces repeated code; large programs are easier for teams to build and maintain; classes can be tested on their own.

### Worked example

```python
class BankAccount:
    interest_rate = 0.02                 # class (static) attribute, shared by all

    def __init__(self, owner, balance=0):   # constructor
        self.__owner = owner             # private attribute (name mangled)
        self.__balance = balance

    def deposit(self, amount):           # public method
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.__balance += amount

    def get_balance(self):               # getter
        return self.__balance

a = BankAccount("Sana", 100)             # instantiation
b = BankAccount("Tom")                   # a second, separate object
a.deposit(50)
print(a.get_balance(), b.get_balance())  # 150 0
```

## Encapsulation and access specifiers

### What you need to know

- Encapsulation is bundling an object's data and the methods that act on it in one unit (the class), and hiding the data so it can only be accessed through those methods (information hiding).
- Access specifiers:
  - public (+ in a class diagram): accessible from anywhere;
  - private (− ): accessible only inside the class itself;
  - protected (#): accessible inside the class and its subclasses.
- Attributes are usually private, with public getter and setter methods. The setter can validate new values, so the object can never get into an invalid state.
- Benefits: data cannot be corrupted by other code; the internal design can change without breaking code that uses the class, as long as the public methods stay the same; reduces errors in team projects.

### Explained

Python has no enforced access specifiers. A leading double underscore makes Python rename (mangle) the attribute, which stops casual access from outside; a single underscore is the convention for protected. In Java or C# `private` is enforced by the compiler.

### Common mistakes

- Defining encapsulation only as "hiding data". Mention combining data and methods into one object too.
- Thinking private attributes cannot be read at all. They can be read through public methods the class chooses to provide.

## Inheritance

### What you need to know

- Inheritance lets a subclass (child, derived class) take on all the attributes and methods of a superclass (parent, base class), and add its own or change some. It models an "is a" relationship: a SavingsAccount is a BankAccount.
- Benefits: code written once in the superclass is reused; changes to the superclass flow to all subclasses; a clear hierarchy.
- Drawbacks: subclasses depend on the superclass, so changing it can break them (tight coupling); deep hierarchies are hard to follow.
- In a class diagram, inheritance is a line with a hollow triangle arrowhead pointing to the superclass. AQA only examines single inheritance (one superclass).

### Worked example

```python
class SavingsAccount(BankAccount):        # inherits BankAccount
    def __init__(self, owner, balance, limit):
        super().__init__(owner, balance)  # call the superclass constructor
        self.__withdrawals_left = limit   # new attribute

    def add_interest(self):               # new method
        self.deposit(self.get_balance() * self.interest_rate)
```

OCR pseudo-code for the same idea:

```
class SavingsAccount inherits BankAccount
    private withdrawalsLeft
    public procedure new(givenOwner, givenBalance, limit)
        super.new(givenOwner, givenBalance)
        withdrawalsLeft = limit
    endprocedure
endclass
```

## Polymorphism and overriding

### What you need to know

- Polymorphism ("many forms") means one method name or interface can behave differently depending on the class of the object it is called on. A program can treat objects of different subclasses through their shared superclass, and each runs its own version.
- Overriding: a subclass provides its own version of a method that is already defined in its superclass, with the same name and parameters. The subclass version is the one that runs for subclass objects.
- (Overloading, several methods with the same name but different parameters in one class, is a different idea; not every language supports it.)

### Worked example

```python
class Shape:
    def area(self):
        raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):                   # overrides Shape.area
        return self.w * self.h

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):                   # overrides Shape.area
        return 3.14159 * self.r ** 2

shapes = [Rectangle(2, 3), Circle(1)]
for s in shapes:
    print(s.area())    # 6, then 3.14159: the same call, different behaviour
```

The loop does not need to know which shape it has. Adding a Triangle class later needs no change to the loop.

## Abstract, virtual and static methods

### What you need to know

- Abstract method: declared in a superclass with no body (no implementation). Every concrete subclass must override it. A class with an abstract method is an abstract class and cannot be instantiated.
- Virtual method: has a body in the superclass but may be overridden in a subclass. (In C# a method must be marked `virtual` to be overridable; in Java and Python all ordinary methods behave as virtual.)
- Static method: belongs to the class itself, not to any object. It is called through the class name and cannot use any one object's attributes. Useful for utility functions and for counting how many objects have been made.

```python
from abc import ABC, abstractmethod

class Employee(ABC):                     # abstract class
    count = 0                            # static (class) attribute

    def __init__(self, name):
        self.name = name
        Employee.count += 1

    @abstractmethod
    def pay(self):                       # abstract method: no body
        ...

    def describe(self):                  # virtual: can be overridden
        return f"{self.name} earns {self.pay()}"

    @staticmethod
    def total_staff():                   # static method
        return Employee.count

class Salaried(Employee):
    def __init__(self, name, salary):
        super().__init__(name)
        self.salary = salary
    def pay(self):
        return self.salary / 12

print(Salaried("Ana", 36000).describe())  # Ana earns 3000.0
print(Employee.total_staff())             # 1
# Employee("X") would raise TypeError: abstract class
```

## Aggregation and composition

### What you need to know

- Both are "has a" relationships (association) where one object contains or uses others.
- Composition: the contained objects cannot exist without the container. If the container is destroyed, so are its parts. Example: a House has Rooms. In a class diagram: a line with a filled (black) diamond at the container end.
- Aggregation: the contained objects can exist independently of the container. If the container is destroyed, they survive. Example: a Team has Players; disband the team and the players still exist. In a class diagram: a line with a hollow (white) diamond at the container end.

```python
class Room:
    def __init__(self, name): self.name = name

class House:                               # composition
    def __init__(self):
        self.rooms = [Room("Kitchen"), Room("Bedroom")]   # created inside, die with house

class Player:
    def __init__(self, name): self.name = name

class Team:                                # aggregation
    def __init__(self, players):
        self.players = players             # passed in: exist outside the team

p = [Player("Lee"), Player("Mo")]
t = Team(p)
del t                                      # players in p still exist
```

## Class diagrams

### What you need to know

- A class box has three parts: class name; attributes (with access symbol and often type); methods (with access symbol, parameters and return type).
- Symbols: + public, − private, # protected. Inheritance: hollow triangle arrow to the superclass. Composition: black diamond at the whole. Aggregation: white diamond at the whole.

### Worked example

```
┌──────────────────────────┐
│ Vehicle                  │
├──────────────────────────┤
│ - registration: String   │
│ # speed: Integer         │
├──────────────────────────┤
│ + Vehicle(reg: String)   │
│ + accelerate(): void     │
│ + getReg(): String       │
└──────────────────────────┘
             △
     ┌───────┴───────┐
┌─────────┐     ┌─────────┐          ◆───── Engine    (Car is composed of an Engine)
│ Car     │     │ Lorry   │
├─────────┤     ├─────────┤          ◇───── Driver    (Lorry aggregates a Driver)
│ - doors │     │ - load  │
└─────────┘     └─────────┘
```

Reading it: Car and Lorry inherit from Vehicle; `speed` is protected so Car's own methods can change it; `registration` is private so Car must use `getReg()`. A Car's Engine is created and destroyed with the Car (composition); a Driver exists independently of any Lorry (aggregation).

## Object-oriented design principles

### What you need to know

- Encapsulate what varies: put the parts of a design that are likely to change behind their own class or interface, so changes do not ripple through the rest of the program.
- Favour composition over inheritance: build objects by combining other objects ("has a") rather than by deep "is a" hierarchies. Composition is more flexible (parts can be swapped at run time) and avoids fragile hierarchies.
- Program to interfaces, not implementation: write code that depends on what an object can do (its interface, often an abstract class), not on a particular concrete class. Then any class meeting the interface can be used. AQA says you will not be tested on writing code to interfaces in the practical exam.

### Explained

A game character can fly, swim or walk, and abilities change in play. With inheritance you might need FlyingSwimmingCharacter, WalkingFlyingCharacter and so on. With composition, a Character has a Movement object, and you swap `FlyMovement()` for `SwimMovement()` at run time. The changing part (how it moves) is encapsulated in its own classes, and Character only uses the Movement interface.

## Common mistakes

- Mixing up the diamonds. Black (filled) = composition = parts die with the whole.
- Saying polymorphism "is when a subclass inherits methods". Inheritance passes methods down; polymorphism is the same call behaving differently depending on the object's class.
- Writing `class` when the question asks for an object, or the reverse: a class is the template, an object is an instance.
- Forgetting to call the superclass constructor in a subclass constructor, so inherited attributes are never set.

## Check questions

1. Define the terms class, object and instantiation. [3 marks]
2. Explain what is meant by encapsulation and why it is useful. [3 marks]
3. Explain the difference between aggregation and composition, with an example of each. [4 marks]
4. A superclass `Animal` has a method `speak()` that returns "...". Subclasses `Dog` and `Cat` return "Woof" and "Miaow". Write the classes in Python or OCR pseudo-code, and explain how this shows polymorphism. [5 marks]
5. State what is meant by an abstract method, and explain why a class containing one cannot be instantiated. [2 marks]
6. Give one use of a static method. [1 mark]
7. In a class diagram, what do the symbols +, − and # mean? [3 marks]
8. A `Library` class contains a list of `Book` objects that are created elsewhere and can be moved between libraries. Draw the class diagram relationship and name it. [2 marks]
9. Explain the principle "favour composition over inheritance". [2 marks]
10. Explain why a setter method is preferred to making an attribute public. [2 marks]

## Mark scheme

1. Class: a template/blueprint defining attributes and methods (1). Object: an instance of a class with its own attribute values (1). Instantiation: creating an object from a class (using a constructor) (1).
2. Combining data and the methods that act on it in one object (1); data hidden/private, accessed only through methods (1); so data cannot be changed in invalid/unexpected ways, or internal code can change without affecting other code (1).
3. Both are "has a" relationships (1). Composition: contained objects cannot exist without the container/destroyed with it, e.g. a house and its rooms (1 + 1 for example). Aggregation: contained objects exist independently, e.g. a team and its players (1). (Max 4; examples must match the definitions.)
4. Example:

```python
class Animal:
    def speak(self): return "..."
class Dog(Animal):
    def speak(self): return "Woof"
class Cat(Animal):
    def speak(self): return "Miaow"
```

Animal class with speak (1); Dog and Cat inherit from Animal (1); each overrides speak (1). Explanation: the same method call `speak()` gives different results depending on the object's class (1); code can treat any Animal the same way, e.g. a loop over a list of animals (1).
5. A method with no implementation that subclasses must override (1); the class is incomplete, as calling the method on an object would have no code to run (1).
6. Any one: a utility function not needing object data, e.g. a conversion; a method to count/return the number of objects created (1).
7. + public (1); − private (1); # protected (1).
8. Hollow (white) diamond at the Library end, line to Book (1); aggregation (1).
9. Build classes by combining objects ("has a") rather than extending classes ("is a") (1); because it is more flexible, e.g. parts can be swapped at run time, and avoids fragile/deep hierarchies (1).
10. The setter can validate the new value before storing it (1); so the object cannot be put into an invalid state / the internal representation can be changed without affecting callers (1).
