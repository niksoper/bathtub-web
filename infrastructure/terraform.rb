require_relative "../common.rb"

def invoke_terraform(command)
  system_req "terraform.exe #{command}"
end
