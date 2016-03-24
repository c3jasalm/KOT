class UserInfoExt(object):
    def get_user_info_hours(self, user_info_string):
        string_components = user_info_string.split()
        return string_components[len(string_components) - 1]
