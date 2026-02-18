import json
import os
import glob

def get_unique_template_for_problem(problem_data):
    """Generate unique templates based on specific problem requirements"""
    problem_id = problem_data.get('id', '')
    title = problem_data.get('title', '')
    
    # Problem-specific templates
    templates = {
        'two-sum': {
            'java': '''import java.util.*;

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
}''',
            'python': '''class Solution:
    def twoSum(self, nums, target):
        # Your code here
        return [0, 0]

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    target = int(input())
    
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(result[0], result[1])'''
        },
        
        'two-sum-sorted': {
            'java': '''import java.util.*;

class Solution {
    public int[] twoSum(int[] numbers, int target) {
        // Your code here
        return new int[0];
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] numsStr = sc.nextLine().split(" ");
        int[] numbers = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            numbers[i] = Integer.parseInt(numsStr[i]);
        }
        int target = sc.nextInt();
        
        Solution sol = new Solution();
        int[] result = sol.twoSum(numbers, target);
        System.out.println(result[0] + " " + result[1]);
    }
}''',
            'python': '''class Solution:
    def twoSum(self, numbers, target):
        # Your code here
        return [0, 0]

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    numbers = list(map(int, input().split()))
    target = int(input())
    
    sol = Solution()
    result = sol.twoSum(numbers, target)
    print(result[0], result[1])'''
        },
        
        'palindrome-number': {
            'java': '''import java.util.*;

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
}''',
            'python': '''class Solution:
    def isPalindrome(self, x):
        # Your code here
        return False

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    x = int(input().strip())
    
    sol = Solution()
    print(str(sol.isPalindrome(x)).lower())'''
        },
        
        'roman-to-integer': {
            'java': '''import java.util.*;

class Solution {
    public int romanToInt(String s) {
        // Your code here
        return 0;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        Solution sol = new Solution();
        System.out.println(sol.romanToInt(s));
    }
}''',
            'python': '''class Solution:
    def romanToInt(self, s):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    s = input().strip()
    
    sol = Solution()
    print(sol.romanToInt(s))'''
        },
        
        'longest-common-prefix': {
            'java': '''import java.util.*;

class Solution {
    public String longestCommonPrefix(String[] strs) {
        // Your code here
        return "";
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] strs = sc.nextLine().split(" ");
        
        Solution sol = new Solution();
        System.out.println(sol.longestCommonPrefix(strs));
    }
}''',
            'python': '''class Solution:
    def longestCommonPrefix(self, strs):
        # Your code here
        return ""

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    strs = input().strip().split()
    
    sol = Solution()
    print(sol.longestCommonPrefix(strs))'''
        },
        
        'valid-parentheses': {
            'java': '''import java.util.*;

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
        System.out.println(sol.isValid(s));
    }
}''',
            'python': '''class Solution:
    def isValid(self, s):
        # Your code here
        return False

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    s = input().strip()
    
    sol = Solution()
    print(str(sol.isValid(s)).lower())'''
        },
        
        'merge-two-sorted-lists': {
            'java': '''import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
        return null;
    }
}

// Driver code - DO NOT MODIFY
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] nums1 = sc.nextLine().split(" ");
        String[] nums2 = sc.nextLine().split(" ");
        
        ListNode list1 = buildList(nums1);
        ListNode list2 = buildList(nums2);
        
        Solution sol = new Solution();
        ListNode result = sol.mergeTwoLists(list1, list2);
        printList(result);
    }
    
    static ListNode buildList(String[] nums) {
        if (nums.length == 0 || nums[0].equals("")) return null;
        ListNode head = new ListNode(Integer.parseInt(nums[0]));
        ListNode curr = head;
        for (int i = 1; i < nums.length; i++) {
            curr.next = new ListNode(Integer.parseInt(nums[i]));
            curr = curr.next;
        }
        return head;
    }
    
    static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(" ");
            head = head.next;
        }
        System.out.println();
    }
}''',
            'python': '''class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1, list2):
        # Your code here
        return None

# Driver code - DO NOT MODIFY
def build_list(nums):
    if not nums or nums == [""]:
        return None
    head = ListNode(int(nums[0]))
    curr = head
    for i in range(1, len(nums)):
        curr.next = ListNode(int(nums[i]))
        curr = curr.next
    return head

def print_list(head):
    result = []
    while head:
        result.append(str(head.val))
        head = head.next
    print(" ".join(result))

if __name__ == "__main__":
    nums1 = input().strip().split()
    nums2 = input().strip().split()
    
    list1 = build_list(nums1)
    list2 = build_list(nums2)
    
    sol = Solution()
    result = sol.mergeTwoLists(list1, list2)
    print_list(result)'''
        },
        
        'remove-duplicates-sorted-array': {
            'java': '''import java.util.*;

class Solution {
    public int removeDuplicates(int[] nums) {
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
        int k = sol.removeDuplicates(nums);
        System.out.println(k);
        for (int i = 0; i < k; i++) {
            System.out.print(nums[i]);
            if (i < k - 1) System.out.print(" ");
        }
        System.out.println();
    }
}''',
            'python': '''class Solution:
    def removeDuplicates(self, nums):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    
    sol = Solution()
    k = sol.removeDuplicates(nums)
    print(k)
    print(*nums[:k])'''
        },
        
        'search-insert-position': {
            'java': '''import java.util.*;

class Solution {
    public int searchInsert(int[] nums, int target) {
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
        int target = sc.nextInt();
        
        Solution sol = new Solution();
        System.out.println(sol.searchInsert(nums, target));
    }
}''',
            'python': '''class Solution:
    def searchInsert(self, nums, target):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    target = int(input())
    
    sol = Solution()
    print(sol.searchInsert(nums, target))'''
        },
        
        'maximum-subarray': {
            'java': '''import java.util.*;

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
}''',
            'python': '''class Solution:
    def maxSubArray(self, nums):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    nums = list(map(int, input().split()))
    
    sol = Solution()
    print(sol.maxSubArray(nums))'''
        },
        
        'climbing-stairs': {
            'java': '''import java.util.*;

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
}''',
            'python': '''class Solution:
    def climbStairs(self, n):
        # Your code here
        return 0

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    n = int(input())
    
    sol = Solution()
    print(sol.climbStairs(n))'''
        }
    }
    
    # Return specific template if exists, otherwise return generic template
    if problem_id in templates:
        return templates[problem_id]
    else:
        # Generic template for problems not specifically handled
        return {
            'java': '''import java.util.*;

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
}''',
            'python': '''class Solution:
    def solve(self):
        # Your code here
        pass

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    sol = Solution()
    sol.solve()'''
        }

def update_all_problem_templates():
    """Update templates for all problems in the problems directory"""
    problems_dir = "problems"
    
    if not os.path.exists(problems_dir):
        print(f"Problems directory '{problems_dir}' not found!")
        return
    
    # Get all JSON files in problems directory
    json_files = glob.glob(os.path.join(problems_dir, "*.json"))
    
    updated_count = 0
    
    for json_file in json_files:
        try:
            # Read the problem file
            with open(json_file, 'r', encoding='utf-8') as f:
                problem_data = json.load(f)
            
            # Get unique template for this problem
            new_templates = get_unique_template_for_problem(problem_data)
            
            # Update the templates
            problem_data['templates'] = new_templates
            
            # Write back to file
            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump(problem_data, f, indent=2, ensure_ascii=False)
            
            print(f"Updated templates for: {problem_data.get('title', 'Unknown')}")
            updated_count += 1
            
        except Exception as e:
            print(f"Error updating {json_file}: {str(e)}")
    
    print(f"\nSuccessfully updated templates for {updated_count} problems!")

if __name__ == "__main__":
    update_all_problem_templates()