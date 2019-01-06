require "English"

def system_req(*args)
  system(*args)
  raise "Failed to run '#{args}'" if $CHILD_STATUS.exitstatus != 0
end
