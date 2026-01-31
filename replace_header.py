# Script to replace header section in Index.tsx
with open('client/pages/Index.tsx', 'r') as f:
    lines = f.readlines()

# Define the replacement (lines 2116-2394, which are indices 2115-2393)
new_header = """      {/* Header */}
      <MastHead 
        companyName="Coca Cola"
        currentSolution={selectedMediaSolution}
        onSolutionChange={setSelectedMediaSolution}
      />

"""

# Replace lines 2115 to 2393 (inclusive) with the new header
new_lines = lines[:2115] + [new_header] + lines[2394:]

# Write back
with open('client/pages/Index.tsx', 'w') as f:
    f.writelines(new_lines)

print("Header replaced successfully!")
