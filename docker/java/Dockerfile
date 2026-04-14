# Java 17 Execution Environment
# Minimal, secure, non-root execution
FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /tmp/code

# Create non-root user
RUN useradd -m -u 1000 executor && \
    chown -R executor:executor /tmp/code

# Remove unnecessary packages to minimize image
RUN apt-get update && \
    apt-get remove -y --purge apt-utils man-db && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Switch to non-root user
# USER executor

# Java execution (class name passed via command line)
# ENTRYPOINT ["java"]
