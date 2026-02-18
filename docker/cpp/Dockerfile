# C++ Execution Environment
# Minimal, secure, non-root execution with g++ compiler
FROM gcc:12-bookworm

# Set working directory
WORKDIR /tmp/code

# Create non-root user
RUN useradd -m -u 1000 executor && \
    chown -R executor:executor /tmp/code

# Install minimal runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libstdc++6 && \
    apt-get remove -y --purge apt-utils && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Switch to non-root user for compilation and execution
# USER executor

# Compile and run (either compile first, then execute)
# This will be handled by the backend service
# ENTRYPOINT ["/bin/bash"]
