import json
import os
import glob

def get_template_for_problem(problem_data):
    """Generate appropriate templates based on problem structure"""
    problem_id = problem_data.get('id', '')
    title = problem_data.get('title', '')
    
    # Determine function signature based on problem type
    if 'array' in problem_id or 'nums' in str(problem_data.get('examples', [])):
        if 'two-sum' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = sc.nextInt();
        
        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}"""
            python_template = """class Solution:
    def twoSum(self, nums, target):
        # Your code here
        return [0, 0]

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    target = int(input())
    
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(result[0], result[1])"""
        elif 'search' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.search(nums, target));
    }
}"""
            python_template = """class Solution:
    def search(self, nums, target):
        # Your code here
        return -1

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    target = int(input())
    
    sol = Solution()
    print(sol.search(nums, target))"""
        elif 'maximum' in problem_id or 'subarray' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
        return 0;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        
        Solution sol = new Solution();
        System.out.println(sol.maxSubArray(nums));
    }
}"""
            python_template = """class Solution:
    def maxSubArray(self, nums):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    
    sol = Solution()
    print(sol.maxSubArray(nums))"""
        else:
            # Generic array problem
            java_template = """import java.util.*;

class Solution {
    public int[] solve(int[] nums) {
        // Your code here
        return new int[0];
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        
        Solution sol = new Solution();
        int[] result = sol.solve(nums);
        for (int i = 0; i < result.length; i++) {
            System.out.print(result[i]);
            if (i < result.length - 1) System.out.print(" ");
        }
        System.out.println();
    }
}"""
            python_template = """class Solution:
    def solve(self, nums):
        # Your code here
        return []

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    
    sol = Solution()
    result = sol.solve(nums)
    print(*result)"""
    
    elif 'string' in problem_id or 'parentheses' in problem_id or 'palindrome' in problem_id:
        if 'valid' in problem_id and 'parentheses' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        Solution sol = new Solution();
        boolean result = sol.isValid(s);
        System.out.println(result);
    }
}"""
            python_template = """class Solution:
    def isValid(self, s):
        # Your code here
        return False

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    s = input().strip()
    
    sol = Solution()
    result = sol.isValid(s)
    print(str(result).lower())"""
        elif 'palindrome' in problem_id and 'number' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
        return false;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome(x));
    }
}"""
            python_template = """class Solution:
    def isPalindrome(self, x):
        # Your code here
        return False

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    x = int(input().strip())
    
    sol = Solution()
    print(str(sol.isPalindrome(x)).lower())"""
        elif 'reverse' in problem_id and 'string' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public void reverseString(char[] s) {
        // Your code here
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        char[] s = input.toCharArray();
        
        Solution sol = new Solution();
        sol.reverseString(s);
        System.out.println(new String(s));
    }
}"""
            python_template = """class Solution:
    def reverseString(self, s):
        # Your code here
        pass

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    input_str = input().strip()
    s = list(input_str)
    
    sol = Solution()
    sol.reverseString(s)
    print(''.join(s))"""
        else:
            # Generic string problem
            java_template = """import java.util.*;

class Solution {
    public String solve(String s) {
        // Your code here
        return "";
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        Solution sol = new Solution();
        System.out.println(sol.solve(s));
    }
}"""
            python_template = """class Solution:
    def solve(self, s):
        # Your code here
        return ""

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    s = input().strip()
    
    sol = Solution()
    print(sol.solve(s))"""
    
    elif 'number' in problem_id or 'fibonacci' in problem_id or 'stairs' in problem_id:
        if 'fibonacci' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public int fib(int n) {
        // Your code here
        return 0;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.fib(n));
    }
}"""
            python_template = """class Solution:
    def fib(self, n):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    n = int(input().strip())
    
    sol = Solution()
    print(sol.fib(n))"""
        elif 'stairs' in problem_id:
            java_template = """import java.util.*;

class Solution {
    public int climbStairs(int n) {
        // Your code here
        return 0;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.climbStairs(n));
    }
}"""
            python_template = """class Solution:
    def climbStairs(self, n):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    n = int(input().strip())
    
    sol = Solution()
    print(sol.climbStairs(n))"""
        else:
            # Generic number problem
            java_template = """import java.util.*;

class Solution {
    public int solve(int n) {
        // Your code here
        return 0;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.solve(n));
    }
}"""
            python_template = """class Solution:
    def solve(self, n):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    n = int(input().strip())
    
    sol = Solution()
    print(sol.solve(n))"""
    
    else:
        # Default generic template
        java_template = """import java.util.*;

class Solution {
    public void solve() {
        // Your code here
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        Solution sol = new Solution();
        sol.solve();
    }
}"""
        python_template = """class Solution:
    def solve(self):
        # Your code here
        pass

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    sol = Solution()
    sol.solve()"""
    
    return {
        "java": java_template,
        "python": python_template
    }

def main():
    problems_dir = "C:/dockerjudge/backend/problems"
    json_files = glob.glob(os.path.join(problems_dir, "*.json"))
    
    updated_count = 0
    
    for file_path in json_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check if templates already exist
            if 'templates' not in data:
                print(f"Adding templates to {os.path.basename(file_path)}")
                data['templates'] = get_template_for_problem(data)
                
                # Write back to file
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                
                updated_count += 1
            else:
                print(f"Templates already exist in {os.path.basename(file_path)}")
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    print(f"\nUpdated {updated_count} files with templates")

if __name__ == "__main__":
    main()